import * as retry from 'async-retry'
import {injectable, postConstruct} from 'inversify'
import {createPool, Pool, RowDataPacket} from 'mysql2/promise'
import {PushSubscription} from 'web-push'

import {Config} from '@libs/config'
import {InternalPushSubscription} from '@libs/schema'
import {Id, Timestamp} from '@libs/types'

enum Column {
  Id = 'id',
  Endpoint = 'endpoint',
  AuthKey = 'auth_key',
  P256dhKey = 'p256hd_key',
  UserId = 'user_id',
  SubscribedAt = 'subscribed_at',
}

// TODO integration test for push subscription repository with testcontainers

@injectable()
export class PushSubscriptionRepository {
  private pool!: Pool
  private isInitialized = false
  private isConnected = false
  private tableName = 'push_subscriptions'

  constructor(private config: Config) {}

  @postConstruct()
  async initialize() {
    this.pool = createPool({
      host: this.config.get('mysqlDatabase_host'),
      port: Number(this.config.get('mysqlDatabase_port')),
      user: this.config.get('mysqlDatabase_user'),
      password: this.config.get('secrets_mysqlDatabase_password'),
      database: this.config.get('mysqlDatabase_database'),
    })

    this.pool.on('connection', connection => {
      this.isConnected = true
      connection.on('end', () => {
        this.isConnected = false
        this.isInitialized = false
      })
    })

    const upsertEventsTable = `
      CREATE TABLE IF NOT EXISTS \`${this.tableName}\` (
        ${Column.Id} VARCHAR(255) NOT NULL,
        ${Column.Endpoint} VARCHAR(255) NOT NULL,
        ${Column.AuthKey} VARCHAR(255) NOT NULL,
        ${Column.P256dhKey} VARCHAR(255) NOT NULL,
        ${Column.UserId} VARCHAR(255) NOT NULL,
        ${Column.SubscribedAt} BIGINT NOT NULL,
        PRIMARY KEY (${Column.Id})
      ) ENGINE=InnoDB;
    `
    const connection = await this.getConnection(true)
    await connection.query(upsertEventsTable)
    connection.release()

    this.isInitialized = true
  }

  // TODO check userId
  async create(sub: PushSubscription, userId: string) {
    const query = `
      INSERT INTO \`${this.tableName}\`
        (${Column.Id}, ${Column.Endpoint}, ${Column.AuthKey}, ${Column.P256dhKey}, ${Column.UserId}, ${Column.SubscribedAt})
      VALUES
        (?, ?, ?, ?, ?, ?);
    `
    const connection = await this.getConnection()
    const id = Id.generate()
    await connection.query(query, [
      id.toString(),
      sub.endpoint,
      sub.keys.auth,
      sub.keys.p256dh,
      userId,
      Timestamp.now().toNumber(),
    ])
  }

  async getAll() {
    const query = `
      SELECT *
      FROM \`${this.tableName}\`;
    `
    const connection = await this.getConnection()
    const result = await connection.query(query)
    connection.release()

    const rows = result[0] as RowDataPacket
    return rows.map(this.deserialize) as InternalPushSubscription[]
  }

  async isHealthy() {
    return this.isInitialized && this.isConnected
  }

  async disconnect() {
    await this.pool.end()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deserialize(row: any): InternalPushSubscription {
    return {
      id: row[Column.Id],
      endpoint: row[Column.Endpoint],
      authKey: row[Column.AuthKey],
      p256dhKey: row[Column.P256dhKey],
      userId: row[Column.UserId],
      subscribedAt: row[Column.SubscribedAt],
    }
  }

  private async getConnection(skipInitCheck = false) {
    if (!this.isInitialized && !skipInitCheck) {
      await retry(() => {
        if (!this.isInitialized) throw new Error()
      })
    }
    return this.pool.getConnection()
  }
}
