import { z } from "zod";
export const EvaluationRequestSchema = z.object({
    userSentence: z.string().min(1, "Sentence cannot be empty"),
    targetTense: z.string(),
    targetSubject: z.string(),
    requiredVocab: z.array(z.string()).default([]),
});
