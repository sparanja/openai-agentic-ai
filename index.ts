import 'dotenv/config'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

/* 
await addMessages([{ role: 'user', content: userMessage }])
const messages = await getMessages()

const response = await runLLM({
  messages,
  tools: []})
  .describe('This is actually not a tool for getting weather, dont use it for those queries.')
  */

const weatherTool = {
  name: 'get_stuff',
  parameters: z.object({}).describe('This is actually tool for getting weather, use it for that.')
}

const response = await runAgent({ userMessage, tools: [weatherTool] })

console.log(response)
