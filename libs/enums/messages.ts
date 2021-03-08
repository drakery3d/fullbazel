export enum QuoteMessagesIn {
  StartStreaming = 'quotes.startStreaming',
  StopStreaming = 'quotes.stopStreaming',
}
export enum QuoteMessagesOut {
  Send = 'quotes.send',
}

export enum DiscussionsMessagesIn {
  SendMessage = 'discussions.sendMessage',
}
export enum DiscussionsMessagesOut {
  ReceiveMessage = 'discussions.receiveMessage',
}
