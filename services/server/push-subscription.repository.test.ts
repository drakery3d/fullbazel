/* eslint-disable @typescript-eslint/no-non-null-assertion */

import 'reflect-metadata'

import * as retry from 'async-retry'
import {Container} from 'inversify'
import {GenericContainer, StartedTestContainer} from 'testcontainers'
import {PushSubscription} from 'web-push'

import {Config} from '@libs/config'
import {InternalPushSubscription} from '@libs/schema'

import {PushSubscriptionRepository} from './push-subscription.repository'

describe('user repository', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 15 * 60 * 1000

  let repo: PushSubscriptionRepository
  let mysqlContainer: StartedTestContainer

  const userId1 = '1'
  const userId2 = '2'
  const sub1: PushSubscription = {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/cBpbDy2aGtA:APA91bFD_UVW17Pv80JGpzkDXNnZ-1dRRa133bW6-SWteQCD_bP9Dp_Pf5LcZc9VwJYZLlm6BIug-UIBucZbKAbZgrvy7c9ej_OoZr-ANCpxBCWfaxh0Pl7kr5BmwyLicoPyxn2EHNTJ',
    keys: {
      p256dh:
        'BKtOU0YNo4VVMTSa9YvZ1f-F84AdoIm0-HqvwJIxS79pHe36E6x8IQrWi2yQDfixAzhD8tGVVorYcQi_IhgIXRo',
      auth: 'dXXRmB0sE_ZxViLVb2EmoQ',
    },
  }
  const sub2: PushSubscription = {
    endpoint:
      'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABgSkgHvaGjkBu3KBe3gapg2nW6uinWhprppWfgsS08VU-DdCC3-P3ScAYAmmjyypgKcUKRmclZLby8KYrQj-ZpVBT6qrIjru-dkz7-WXE2Pi3aA-7bel1bYHGSFzoplkXN1c58R2HHGi3mbU2hQkrwIsLyi0fqShd4yB5DTXVSxHj6MME',
    keys: {
      p256dh: 'BBtKMWVeWWIRpepGExEWZ',
      auth: 'ii2rqNWfNfY2aDgT7k3JoA',
    },
  }

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
    container.bind(PushSubscriptionRepository).toSelf()
    repo = container.get(PushSubscriptionRepository)

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
    await repo.create(sub1, userId1)
    await repo.create(sub2, userId2)
  })

  it('gets all', async () => {
    const subs = await repo.getAll()
    expect(subs.length).toEqual(2)

    const expected1: Partial<InternalPushSubscription> = {
      endpoint: sub1.endpoint,
      authKey: sub1.keys.auth,
      p256dhKey: sub1.keys.p256dh,
      userId: userId1,
    }
    expect(subs[0]).toEqual(jasmine.objectContaining(expected1))

    const expected2: Partial<InternalPushSubscription> = {
      endpoint: sub2.endpoint,
      authKey: sub2.keys.auth,
      p256dhKey: sub2.keys.p256dh,
      userId: userId2,
    }
    expect(subs[1]).toEqual(jasmine.objectContaining(expected2))
  })
})
