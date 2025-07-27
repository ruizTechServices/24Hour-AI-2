const { Client, Environment } = require('square');
require('dotenv').config()

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

export { client };