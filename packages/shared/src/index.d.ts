import { z } from "zod";
export declare const EvaluationRequestSchema: z.ZodObject<{
    userSentence: z.ZodString;
    targetTense: z.ZodString;
    targetSubject: z.ZodString;
    requiredVocab: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    userSentence: string;
    targetTense: string;
    targetSubject: string;
    requiredVocab: string[];
}, {
    userSentence: string;
    targetTense: string;
    targetSubject: string;
    requiredVocab?: string[] | undefined;
}>;
export declare const CorrectionSchema: z.ZodObject<{
    type: z.ZodEnum<["GRAMMAR_AGREEMENT", "VERB_CONJUGATION", "INCORRECT_TENSE", "WRONG_VOCABULARY", "SPELLING_TYPO", "UNNATURAL_PHRASING"]>;
    originalSegment: z.ZodString;
    replacementSegment: z.ZodString;
    explanationEn: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "GRAMMAR_AGREEMENT" | "VERB_CONJUGATION" | "INCORRECT_TENSE" | "WRONG_VOCABULARY" | "SPELLING_TYPO" | "UNNATURAL_PHRASING";
    originalSegment: string;
    replacementSegment: string;
    explanationEn: string;
}, {
    type: "GRAMMAR_AGREEMENT" | "VERB_CONJUGATION" | "INCORRECT_TENSE" | "WRONG_VOCABULARY" | "SPELLING_TYPO" | "UNNATURAL_PHRASING";
    originalSegment: string;
    replacementSegment: string;
    explanationEn: string;
}>;
export declare const EvaluationResponseSchema: z.ZodObject<{
    isCorrect: z.ZodBoolean;
    overallScore: z.ZodNumber;
    criteriaCheck: z.ZodObject<{
        correctTenseUsed: z.ZodBoolean;
        correctSubjectUsed: z.ZodBoolean;
        requiredVocabUsed: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        correctTenseUsed: boolean;
        correctSubjectUsed: boolean;
        requiredVocabUsed: boolean;
    }, {
        correctTenseUsed: boolean;
        correctSubjectUsed: boolean;
        requiredVocabUsed: boolean;
    }>;
    corrections: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<["GRAMMAR_AGREEMENT", "VERB_CONJUGATION", "INCORRECT_TENSE", "WRONG_VOCABULARY", "SPELLING_TYPO", "UNNATURAL_PHRASING"]>;
        originalSegment: z.ZodString;
        replacementSegment: z.ZodString;
        explanationEn: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "GRAMMAR_AGREEMENT" | "VERB_CONJUGATION" | "INCORRECT_TENSE" | "WRONG_VOCABULARY" | "SPELLING_TYPO" | "UNNATURAL_PHRASING";
        originalSegment: string;
        replacementSegment: string;
        explanationEn: string;
    }, {
        type: "GRAMMAR_AGREEMENT" | "VERB_CONJUGATION" | "INCORRECT_TENSE" | "WRONG_VOCABULARY" | "SPELLING_TYPO" | "UNNATURAL_PHRASING";
        originalSegment: string;
        replacementSegment: string;
        explanationEn: string;
    }>, "many">;
    naturalAlternative: z.ZodString;
    tutorEncouragement: z.ZodString;
}, "strip", z.ZodTypeAny, {
    isCorrect: boolean;
    overallScore: number;
    criteriaCheck: {
        correctTenseUsed: boolean;
        correctSubjectUsed: boolean;
        requiredVocabUsed: boolean;
    };
    corrections: {
        type: "GRAMMAR_AGREEMENT" | "VERB_CONJUGATION" | "INCORRECT_TENSE" | "WRONG_VOCABULARY" | "SPELLING_TYPO" | "UNNATURAL_PHRASING";
        originalSegment: string;
        replacementSegment: string;
        explanationEn: string;
    }[];
    naturalAlternative: string;
    tutorEncouragement: string;
}, {
    isCorrect: boolean;
    overallScore: number;
    criteriaCheck: {
        correctTenseUsed: boolean;
        correctSubjectUsed: boolean;
        requiredVocabUsed: boolean;
    };
    corrections: {
        type: "GRAMMAR_AGREEMENT" | "VERB_CONJUGATION" | "INCORRECT_TENSE" | "WRONG_VOCABULARY" | "SPELLING_TYPO" | "UNNATURAL_PHRASING";
        originalSegment: string;
        replacementSegment: string;
        explanationEn: string;
    }[];
    naturalAlternative: string;
    tutorEncouragement: string;
}>;
export type EvaluationRequest = z.infer<typeof EvaluationRequestSchema>;
export type EvaluationResponse = z.infer<typeof EvaluationResponseSchema>;
//# sourceMappingURL=index.d.ts.map