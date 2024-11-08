import { z, ZodType } from "zod";

export class UserValidation {
    static readonly CREATE: ZodType = z.object({
        participantId: z.string().min(1).max(255),
        noPegawai: z.string().max(20).optional().nullable(),
        nik: z.string().max(50).optional().nullable(),
        email: z.string().min(1).max(50).email(),
        name: z.string().min(1).max(50),    
        password: z.string().min(1).max(100),
        dinas: z.string().max(20).optional().nullable(),
        roleId: z.string().min(1),
    });

    static readonly UPDATE: ZodType = z.object({
        noPegawai: z.string().min(1).max(20).optional().nullable(),
        nik: z.string().min(1).max(50).optional().nullable(),
        email: z.string().min(1).max(50).email().optional(),
        name: z.string().min(1).max(50).optional(),    
        password: z.string().min(1).max(100).optional(),
        dinas: z.string().min(1).max(20).optional().nullable(),
        roleId: z.string().min(1).optional(),
    });

    static readonly LIST: ZodType = z.object({
        page: z.number().positive().optional(),
        size: z.number().positive().optional(),
    });

    static readonly SEARCH: ZodType = z.object({
        searchQuery: z.string().min(1),
        page: z.number().min(1).positive(),
        size: z.number().min(1).positive(),
    });
}