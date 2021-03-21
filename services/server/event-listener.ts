import {injectable} from 'inversify'
import {Consumer, Kafka, logLevel} from 'kafkajs'
import {Observable, Observer} from 'rxjs'

import {Config} from '@libs/config'

export interface IEventListener {
  consume: (
    groupId: string,
    topic: string | RegExp,
    fromBeginning: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<Observable<any>>
  disconnectAll: () => Promise<void>
  isConnected: () => boolean
}

@injectable()
export class EventListener implements IEventListener {
  private kafka = new Kafka({
    brokers: this.config.getArray('kafka_brokers_0'),
    logLevel: logLevel.WARN,
  })
  private consumers: Consumer[] = []
  private consumerConnections: boolean[] = []

  constructor(private readonly config: Config) {}

  async consume(groupId: string, topic: string | RegExp, fromBeginning = false) {
    const consumer = this.kafka.consumer({groupId})
    this.consumers.push(consumer)
    this.consumerConnections.push(false)
    const index = this.consumerConnections.length - 1

    consumer.on('consumer.disconnect', () => {
      this.consumerConnections[index] = false
    })

    await consumer.connect()
    console.log('connected to consumer for topic', topic)
    this.consumerConnections[index] = true
    await consumer.subscribe({topic, fromBeginning})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Observable((observer: Observer<any>) => {
      consumer.run({
        eachMessage: async message => {
          if (!message.message.value) return
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const event = JSON.parse(message.message.value.toString()) as any
          console.log('[consume]:', topic, event)
          observer.next(event)
        },
      })
    })
  }

  async disconnectAll() {
    await Promise.all(this.consumers.map(c => c.disconnect()))
    this.consumers = []
    this.consumerConnections = []
  }

  isConnected() {
    for (const connected of this.consumerConnections) {
      if (!connected) return false
    }
    return true
  }
}
