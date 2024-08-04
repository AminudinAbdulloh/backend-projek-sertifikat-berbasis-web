import { Request } from 'express';
import { User } from '@prisma/client';

export interface RegisterUserRequest {
    no_pegawai?: string;
    nik?: string;
    email: string;
    name: string;
    password: string;
    dinasId: number;
    roleId: number;
}

export interface LoginUserRequest {
    identifier: string;
    password: string;
}

export interface CurrentUserRequest extends Request {
    user: User;
}

export interface UpdateUserRequest {
    no_pegawai?: string;
    nik?: string;
    email?: string;
    name?: string;
    password?: string;
    dinasId?: number;
    roleId?: number;
}

export interface UserResponse {
    id: number;
    no_pegawai?: string;
    nik?: string;
    email: string;
    name: string;
    dinasId?: number;
    roleId: number;
    token?: string;
}