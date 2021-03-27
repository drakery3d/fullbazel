/* eslint-disable @typescript-eslint/no-non-null-assertion */

import 'reflect-metadata'

import * as retry from 'async-retry'
import {Container} from 'inversify'
import {GenericContainer, StartedTestContainer} from 'testcontainers'

import {Config} from '@libs/config'
import {Message} from '@libs/schema'
import {expectAsyncError} from '@libs/testing'
import {Id} from '@libs/types'

import {MessagesRepository} from './messages.repository'

describe('user repository', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 60 * 1000

  let repo: MessagesRepository
  let mysqlContainer: StartedTestContainer

  const userId1 = '1'
  const userId2 = '2'
  const message1 = {content: 'Hi there', userId: userId1}
  const message2 = {content: 'What is going on?', userId: userId2}
  let messageDb1: Message
  let messageDb2: Message

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
    container.bind(MessagesRepository).toSelf()
    repo = container.get(MessagesRepository)

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
    messageDb1 = await repo.create(message1.content, message1.userId)
    messageDb2 = await repo.create(message2.content, message2.userId)
  })

  it('gets by id', async () => {
    const result1 = await repo.getById(Id.fromString(messageDb1.id))
    expect(result1).toEqual(jasmine.objectContaining(message1))

    const result2 = await repo.getById(Id.fromString(messageDb2.id))
    expect(result2).toEqual(jasmine.objectContaining(message2))

    const result3 = await repo.getById(Id.generate())
    expect(result3).not.toBeDefined()
  })

  it('gets by id and throws', async () => {
    await expectAsyncError(() => repo.getByIdOrFail(Id.generate()))
  })

  it('gets all', async () => {
    const all = await repo.getAll()
    expect(all.length).toEqual(2)

    expect(all[0]).toEqual(jasmine.objectContaining(message1))
    expect(all[1]).toEqual(jasmine.objectContaining(message2))
  })
})
