import { SquareClient, SquareEnvironment, SquareError } from "square";
require('dotenv').config()

export const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});