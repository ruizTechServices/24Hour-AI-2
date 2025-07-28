const { Client, Environment } = require('square');
require('dotenv').config()

// Lazy-initialized Square client to avoid build-time errors
let _client: any = null;

function getClient() {
  if (!_client) {
    _client = new Client({
      accessToken: process.env.SQUARE_ACCESS_TOKEN,
      environment: Environment.Sandbox,
    });
  }
  return _client;
}

// Export a proxy that initializes the client on first access
export const client = new Proxy({} as any, {
  get(target, prop, receiver) {
    const actualClient = getClient();
    return Reflect.get(actualClient, prop, receiver);
  }
});