import { z } from "zod";
export const EvaluationRequestSchema = z.object({
    userSentence: z.string().min(1, "Sentence cannot be empty"),
    targetTense: z.string(),
    targetSubject: z.string(),
    requiredVocab: z.array(z.string()).default([]),
});
export const CorrectionSchema = z.object({
    type: z.enum([
        "GRAMMAR_AGREEMENT",
        "VERB_CONJUGATION",
        "INCORRECT_TENSE",
        "WRONG_VOCABULARY",
        "SPELLING_TYPO",
        "UNNATURAL_PHRASING"
    ]),
    originalSegment: z.string(),
    replacementSegment: z.string(),
    explanationEn: z.string(),
});
export const EvaluationResponseSchema = z.object({
    isCorrect: z.boolean(),
    overallScore: z.number().min(0).max(100),
    criteriaCheck: z.object({
        correctTenseUsed: z.boolean(),
        correctSubjectUsed: z.boolean(),
        requiredVocabUsed: z.boolean(),
    }),
    corrections: z.array(CorrectionSchema),
    naturalAlternative: z.string(),
    tutorEncouragement: z.string(),
});
