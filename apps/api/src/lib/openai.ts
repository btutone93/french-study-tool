import OpenAI from "openai";
import { ChatCompletion } from "openai/resources.mjs";
import { ChatCompletionMessage } from "openai/src/resources.js";

/**
 * Create a configured OpenAI (Groq) client.
 * Reads configuration values from environment variables.
 */
export function createOpenAIClient(): OpenAI {
  return new OpenAI({
    baseURL: process.env.GROQ_BASE_URL ?? "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY ?? "",
  });
}

/**
 * Generic evaluation helper – receives a ready‑made list of messages and a
 * response format, calls the model, and returns the parsed JSON payload.
 *
 * The function is deliberately agnostic about *which* prompts are used; any
 * caller can build the `messages` array (e.g., from a prompts module) and pass
 * it in here.
 */
export async function evaluateSentence(
  client: OpenAI,
  messages: OpenAI.ChatCompletionMessageParam[],
  responseFormat: any // keep generic – callers provide the Zod‑based format
): Promise<any> {
  const response = await client.chat.completions.create({
    model: "openai/gpt-oss-20b",
    temperature: 0.1,
    messages,
    response_format: responseFormat,
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No evaluation returned from Groq.");
  }
  // The caller can cast the parsed JSON to the appropriate type.
  return JSON.parse(content);
}
