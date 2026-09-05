import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { EvaluationRequestSchema } from "@repo/shared";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok" }));

app.post("/evaluate", async (c) => {
  const body = await c.req.json();
  const parsed = EvaluationRequestSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid payload", details: parsed.error.format() }, 400);
  }

  // Ready to call Groq / OpenAI API here!
  return c.json({
    message: "Sentence received!",
    data: parsed.data,
  });
});

// 1. Production handler export for AWS Lambda
export const handler = handle(app);

// 2. Local development server fallback
if (process.env.NODE_ENV !== "production") {
  import("@hono/node-server").then(({ serve }) => {
    serve({ fetch: app.fetch, port: 3001 });
  });
}