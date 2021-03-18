import {injectable} from 'inversify'
import {Kafka, logLevel, Message} from 'kafkajs'

import {Config} from '@libs/config'

export interface IEventDispatcher {
  dispatch: (topic: string, messages: Message[]) => Promise<void>
  disconnect: () => Promise<void>
  isConnected: () => boolean
}

@injectable()
export class EventDispatcher implements IEventDispatcher {
  private kafka = new Kafka({
    brokers: this.config.getArray('kafka_brokers_0'),
    logLevel: logLevel.WARN,
    ssl: !!this.config.get('kafka_apiKey'),
    sasl: {
      mechanism: 'plain',
      username: this.config.get('kafka_apiKey'),
      password: this.config.get('secrets_kafka_apiSecret'),
    },
  })
  private producer = this.kafka.producer()
  private connected = false

  constructor(private readonly config: Config) {
    this.connect()
  }

  async dispatch(topic: string, messages: Message[]) {
    await this.connect()
    await this.producer.send({topic, messages})
    console.log('[dispatch]', topic, messages)
  }

  async disconnect() {
    await this.producer.disconnect()
    this.connected = false
  }

  isConnected() {
    return this.connected
  }

  private async connect() {
    if (!this.connected) {
      await this.producer.connect()
      this.connected = true
    }
  }
}
