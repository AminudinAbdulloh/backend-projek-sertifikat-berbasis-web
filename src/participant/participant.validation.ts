import { z, ZodType } from "zod";

export class ParticipantValidation {
    static readonly CREATE: ZodType = z.object({
        no_pegawai: z.string().min(1).max(20).optional(),
        nama: z.string().min(1).max(50),
        nik: z.string().min(1).min(1).max(50),
        dinas: z.string().min(1).max(50).optional(),
        bidang: z.string().min(1).max(50).optional(),
        perusahaan: z.string().min(1).max(50).optional(),
        email: z.string().email().min(1).max(50),
        no_telp: z.string().min(1).max(50),
        negara: z.string().min(1).max(50),
        tempat_lahir: z.string().max(50),
        tanggal_lahir: z.date(),
        sim_a: z.instanceof(Buffer),
        sim_b: z.instanceof(Buffer),
        ktp: z.instanceof(Buffer),
        foto: z.instanceof(Buffer),
        surat_sehat_buta_warna: z.instanceof(Buffer),
        exp_surat_sehat: z.date(),
        surat_bebas_narkoba: z.instanceof(Buffer),
        exp_bebas_narkoba: z.date(),
        link_qr_code: z.string().min(1).max(255).optional(),
        qr_code: z.instanceof(Buffer),
        gmf_non_gmf: z.string().min(1).max(20),
    });

    static readonly UPDATE: ZodType = z.object({
        no_pegawai: z.string().min(1).max(20).optional(),
        nama: z.string().min(1).max(50).optional(),
        nik: z.string().min(1).min(1).max(50).optional(),
        dinas: z.string().min(1).max(50).optional(),
        bidang: z.string().min(1).max(50).optional(),
        perusahaan: z.string().min(1).max(50).optional(),
        email: z.string().email().min(1).max(50).optional(),
        no_telp: z.string().min(1).max(50).optional(),
        negara: z.string().min(1).max(50).optional(),
        tempat_lahir: z.string().max(50).optional(),
        tanggal_lahir: z.date().optional(),
        sim_a: z.instanceof(Buffer).optional(),
        sim_b: z.instanceof(Buffer).optional(),
        ktp: z.instanceof(Buffer).optional(),
        foto: z.instanceof(Buffer).optional(),
        surat_sehat_buta_warna: z.instanceof(Buffer).optional(),
        exp_surat_sehat: z.date().optional(),
        surat_bebas_narkoba: z.instanceof(Buffer).optional(),
        exp_bebas_narkoba: z.date().optional(),
        link_qr_code: z.string().min(1).max(255).optional(),
        qr_code: z.instanceof(Buffer).optional(),
        gmf_non_gmf: z.string().min(1).max(20).optional(),
    });

    static readonly LIST: ZodType = z.object({
        page: z.number().positive().optional(),
        size: z.number().positive().optional(),
    });
}