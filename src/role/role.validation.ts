import { z, ZodType } from "zod";

export class RoleValidation {
    static readonly CREATE: ZodType = z.object({
        role: z.string().min(1).max(50),
    });

    static readonly UPDATE: ZodType = z.object({
        role: z.string().min(1).max(50).optional(),
    });
}