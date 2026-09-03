import { serve } from "@hono/node-server";
import { Hono } from "hono";
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

const port = 3001;
console.log(`API running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });