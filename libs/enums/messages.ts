export enum QuoteMessagesIn {
  StartStreaming = 'quotes.startStreaming',
  StopStreaming = 'quotes.stopStreaming',
}
export enum QuoteMessagesOut {
  Send = 'quotes.send',
}

export enum DiscussionsMessagesIn {
  SendMessage = 'discussions.sendMessage',
  LoadMessages = 'discussions.loadMessages',
}
export enum DiscussionsMessagesOut {
  ReceiveMessage = 'discussions.receiveMessage',
  ExistingMessages = 'discussions.existingMessages',
}
