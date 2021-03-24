// TODO generate prod.ts in ci-cd pipeline

export default {
  environment: 'dev',
  api: 'http://localhost:3000',
  websocket: 'ws://localhost:3000',
  // TODO fetch from server instead and then remove here
  vapidPublicKey: '',
  googleSignInUrl: '',
}
