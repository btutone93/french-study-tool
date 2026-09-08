import { EvaluationRequest } from "@repo/shared";
import { ChatCompletionMessageParam } from "openai/src/resources.js";

/**
 * Base system prompt template – can be customised by the caller before it is
 * combined with the user‑specific prompt.
 */
export function systemPromptTemplate(ctx: EvaluationRequest): string {
  return `
You are a precise, supportive French language tutor.
Your job is to evaluate a student's French sentence against specific target criteria.

STRICT EVALUATION RULES:
1. Check if the sentence strictly uses the target subject: "${ctx.targetSubject}".
2. Check if the verb is conjugated in the target tense: "${ctx.targetTense}".
3. Verify that all required vocabulary words are included: ${ctx.requiredVocab.join(", ")}.
4. Inspect French grammar rules carefully (e.g., gender agreement, auxiliary verb choices with être/avoir, plural markings).
5. Provide helpful, concise explanations in English for any mistakes.
`;
}

/** User‑prompt containing the sentence to be graded. */
export function userPromptTemplate(ctx: EvaluationRequest): string {
  return `Student Sentence to Grade: "${ctx.userSentence}"`;
}

/**
 * Build the full message list expected by the OpenAI chat endpoint.
 * Allows a pre‑constructed system prompt (so callers can prepend additional
 * instructions if needed) and appends the user prompt derived from the request.
 */
export function buildEvaluationMessages(
  ctx: EvaluationRequest
): ChatCompletionMessageParam[] {
  return [
    { role: "system", content: systemPromptTemplate(ctx) },
    { role: "user", content: userPromptTemplate(ctx) },
  ];
}
