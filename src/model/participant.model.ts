export interface CreateParticipantRequest {
    no_pegawai?: string;
    nama: string;
    nik: string;
    dinas?: string;
    bidang?: string;
    perusahaan: string;
    email: string;
    no_telp: string;
    negara: string;
    tempat_lahir: string;
    tanggal_lahir: Date;
    sim_a: Buffer;
    sim_b: Buffer;
    ktp: Buffer;
    foto: Buffer;
    surat_sehat_buta_warna: Buffer;
    exp_surat_sehat: Date;
    surat_bebas_narkoba: Buffer;
    exp_bebas_narkoba: Date;
    gmf_non_gmf?: string;
    link_qr_code?: string;
    qr_code?: Buffer;
}

export interface UpdateParticipantRequest {
    no_pegawai?: string;
    nama?: string;
    nik?: string;
    dinas?: string;
    bidang?: string;
    perusahaan?: string;
    email?: string;
    no_telp?: string;
    negara?: string;
    tempat_lahir?: string;
    tanggal_lahir?: Date;
    sim_a?: Buffer;
    sim_b?: Buffer;
    ktp?: Buffer;
    foto?: Buffer;
    surat_sehat_buta_warna?: Buffer;
    exp_surat_sehat?: Date;
    surat_bebas_narkoba?: Buffer;
    exp_bebas_narkoba?: Date;
    gmf_non_gmf?: string;
}

export interface ParticipantList {
    id: string;
    no_pegawai: string;
    nama: string;
    nik?: string;
    dinas: string;
    bidang: string;
    perusahaan?: string;
    email: string;
    no_telp: string;
    negara: string;
    tempat_lahir: string;
    tanggal_lahir: Date;
    exp_surat_sehat: Date;
    exp_bebas_narkoba: Date;
    gmf_non_gmf: string;
    link_qr_code: string;
}

export interface ListParticipantResponse {
    id: string;
    no_pegawai?: string;
    nama: string;
    dinas?: string;
    bidang?: string;
    perusahaan: string;
}

export interface ParticipantResponse {
    id: string;
    no_pegawai: string;
    nama: string;
    nik?: string;
    dinas: string;
    bidang: string;
    perusahaan?: string;
    email: string;
    no_telp: string;
    negara: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    exp_surat_sehat: string;
    exp_bebas_narkoba: string;
    gmf_non_gmf: string;
    link_qr_code?: string;
}