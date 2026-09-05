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
export type EvaluationRequest = z.infer<typeof EvaluationRequestSchema>;
//# sourceMappingURL=index.d.ts.map