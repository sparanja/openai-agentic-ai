import type OpenAI from "openai";
import { generateImage, generateImageToolDefinition } from "./tools/generateImage";
import { dadJoke, dadJokesToolDefinition } from "./tools/dadJokes";
import { reddit, redditToolDefinition } from "./tools/reddit";

const getWeather = () => "The weather is sunny with a high of 85°F.";

export const runTool = async (
    toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
    userMessage: string
) => {
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || "{}"),
    }

    switch (toolCall.function.name) {
        case generateImageToolDefinition.name:
            return generateImage(input)
        case dadJokesToolDefinition.name:
            return dadJoke(input)
        case redditToolDefinition.name:
            return reddit(input)
        case "get_weather":
            return getWeather()
        default:
            throw new Error(`Unknown tool: ${toolCall.function.name}`);
    }
}