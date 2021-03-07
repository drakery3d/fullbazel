import * as retry from 'async-retry'
import {injectable, postConstruct} from 'inversify'
import {createPool, Pool, RowDataPacket} from 'mysql2/promise'

import {Config} from '@libs/config'
import {User} from '@libs/schema'
import {Timestamp} from '@libs/types'

enum Column {
  Id = 'id',
  Email = 'email',
  Name = 'name',
  Picture = 'picture',
  CreatedAt = 'created_at',
  TokenRefreshCount = 'token_refresh_count',
}

// TODO integration test for user repository with testcontainers

@injectable()
export class UserRepository {
  private pool!: Pool
  private isInitialized = false
  private isConnected = false
  private tableName = 'users'

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
        ${Column.Email} VARCHAR(255) NOT NULL UNIQUE,
        ${Column.Name} VARCHAR(255) NOT NULL,
        ${Column.Picture} VARCHAR(255) NOT NULL,
        ${Column.CreatedAt} BIGINT NOT NULL,
        ${Column.TokenRefreshCount} INT NOT NULL,
        PRIMARY KEY (${Column.Id}),
        INDEX (${Column.Email})
      ) ENGINE=InnoDB;
    `
    const connection = await this.getConnection(true)
    await connection.query(upsertEventsTable)
    connection.release()

    this.isInitialized = true
  }

  async create(id: string, email: string, name: string, picture: string) {
    const query = `
      INSERT INTO \`${this.tableName}\`
        (${Column.Id}, ${Column.Email}, ${Column.Name}, ${Column.Picture}, ${Column.CreatedAt}, ${Column.TokenRefreshCount})
      VALUES
        (?, ?, ?, ?, ?, ?);
    `
    const connection = await this.getConnection()
    await connection.query(query, [id, email, name, picture, Timestamp.now().toNumber(), 0])
    return this.getByIdOrFail(id)
  }

  async getByIdOrFail(id: string) {
    const user = await this.getById(id)
    if (!user) throw new Error('User not found')
    return user
  }

  async getById(id: string) {
    const query = `
      SELECT *
      FROM \`${this.tableName}\`
      WHERE ${Column.Id} = ?
      LIMIT 1;
    `
    const connection = await this.getConnection()
    const result = await connection.query(query, [id])
    connection.release()

    const rows = result[0] as RowDataPacket
    const user = rows[0]
    if (!user) return undefined
    return this.deserialize(user)
  }

  async isHealthy() {
    return this.isInitialized && this.isConnected
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deserialize(row: any): User {
    return {
      id: row[Column.Id],
      email: row[Column.Email],
      name: row[Column.Name],
      picture: row[Column.Picture],
      createdAt: row[Column.CreatedAt],
      tokenRefreshCount: row[Column.TokenRefreshCount],
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
