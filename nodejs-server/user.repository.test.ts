/* eslint-disable @typescript-eslint/no-non-null-assertion */

import 'reflect-metadata'

import * as retry from 'async-retry'
import {Container} from 'inversify'
import {GenericContainer, StartedTestContainer} from 'testcontainers'

import {Config} from '@libs/config'
import {expectAsyncError} from '@libs/testing'

import {UserRepository} from './user.repository'

describe('user repository', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 60 * 1000

  let repo: UserRepository
  let mysqlContainer: StartedTestContainer

  const user1 = {
    id: '1',
    email: 'user1@example.com',
    name: 'User One',
    picture: 'https://example.com/user1.jpg',
  }
  const user2 = {
    id: '2',
    email: 'user2@example.com',
    name: 'User Two',
    picture: 'https://example.com/user2.jpg',
  }
  const id3 = '3'

  beforeAll(async () => {
    mysqlContainer = await new GenericContainer('mysql')
      .withExposedPorts(3306)
      .withEnv('MYSQL_ROOT_PASSWORD', 'password')
      .withEnv('MYSQL_DATABASE', 'testing')
      .start()

    process.env['MYSQL_HOST'] = mysqlContainer.getHost()
    process.env['MYSQL_PORT'] = mysqlContainer.getMappedPort(3306).toString()
    process.env['MYSQL_USER'] = 'root'
    process.env['MYSQL_PASSWORD'] = 'password'
    process.env['MYSQL_DATABASE'] = 'testing'

    const container = new Container({skipBaseClassChecks: true})
    container.bind(Config).toSelf()
    container.bind(UserRepository).toSelf()
    repo = container.get(UserRepository)

    await retry(async () => {
      const isHealthy = await repo.isHealthy()
      if (!isHealthy) throw new Error()
    })
  })

  afterAll(async () => {
    await repo.disconnect()
    await mysqlContainer.stop()
  })

  it('creates', async () => {
    await repo.create(user1.id, user1.email, user1.name, user1.picture)
    await repo.create(user2.id, user2.email, user2.name, user2.picture)
  })

  it('gets by id', async () => {
    const user1Db = await repo.getById(user1.id)
    expect(user1Db).toEqual(jasmine.objectContaining(user1))
    expect(user1Db!.tokenRefreshCount).toEqual(0)
    expect(user1Db!.createdAt).toBeDefined()

    const user2Db = await repo.getById(user2.id)
    expect(user2Db).toEqual(jasmine.objectContaining(user2))
    expect(user2Db!.tokenRefreshCount).toEqual(0)
    expect(user2Db!.createdAt).toBeDefined()

    const user3Db = await repo.getById(id3)
    expect(user3Db).not.toBeDefined()
  })

  it('gets by ids', async () => {
    const ids = [user1.id, user2.id]
    const users = await repo.getByIds(ids)
    expect(users.length).toEqual(2)
    expect(users[0]).toEqual(jasmine.objectContaining(user1))
    expect(users[1]).toEqual(jasmine.objectContaining(user2))
  })

  it('gets by id and throws', async () => {
    await expectAsyncError(() => repo.getByIdOrFail(id3))
  })
})
