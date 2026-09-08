import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { EvaluationRequest, EvaluationRequestSchema, EvaluationResponse, EvaluationResponseSchema } from "@repo/shared";
import { zodResponseFormat } from "openai/helpers/zod";
import {
  createOpenAIClient,
  evaluateSentence,
} from "./lib/openai";
import { buildEvaluationMessages } from "./prompts";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok" }));

// need to add logs in here
app.post("/evaluate", async (c) => {
  const body = await c.req.json();
  const parsed = EvaluationRequestSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid payload", details: parsed.error.format() }, 400);
  }

  // Cast to the minimal interface expected by our prompt helpers.
  const context = parsed.data as EvaluationRequest;

  // console.log('process.env: ', process.env);

  const client = createOpenAIClient();
  const messages = buildEvaluationMessages(context);

  const evaluation = await evaluateSentence(
    client,
    messages,
    zodResponseFormat(EvaluationResponseSchema, "evaluation")
  );

  return c.json(evaluation as EvaluationResponse);
});

// 1. Production handler export for AWS Lambda
export const handler = handle(app);

// 2. Local development server fallback
if (process.env.NODE_ENV !== "production") {
  import("@hono/node-server").then(({ serve }) => {
    serve({ fetch: app.fetch, port: 3001 });
  });
}