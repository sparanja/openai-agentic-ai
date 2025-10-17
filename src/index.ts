import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'
import { redditToolDefinition } from './src/tools/reddit'
import { generateImageToolDefinition } from './src/tools/generateImage'
import { dadJokesToolDefinition } from './src/tools/dadJokes'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const weatherTool = {
  name: 'get_weather',
  description: `use this to get the weather`,
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
}

const agentTools = [
  redditToolDefinition,
  weatherTool,
  generateImageToolDefinition,
  dadJokesToolDefinition,
]

await runAgent({ userMessage, tools: agentTools })
