import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/service/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) {
    }

    async deleteUser() {
        await this.prismaService.user.deleteMany();
    }

    async createUser(){
        await this.prismaService.user.create({
            data: {
                no_pegawai: 'test',
                nik: 'test',
                email: 'test@example.com',
                name: 'test',
                password: await bcrypt.hash('test', 10),
                dinasId: 1,
                roleId: 4,
            }
        });
    }

    async createSuperAdmin(){
        await this.prismaService.user.create({
            data: {
                no_pegawai: 'super admin',
                nik: 'super admin',
                email: 'superadmin@example.com',
                name: 'super admin',
                password: await bcrypt.hash('super admin', 10),
                roleId: 1,
            }
        });
    }

    async createSupervisor(){
        await this.prismaService.user.create({
            data: {
                no_pegawai: 'supervisor',
                nik: 'supervisor',
                email: 'supervisor@example.com',
                name: 'supervisor',
                password: await bcrypt.hash('supervisor', 10),
                roleId: 2,
            }
        });
    }

    async createLCU(){
        await this.prismaService.user.create({
            data: {
                no_pegawai: 'lcu',
                nik: 'lcu',
                email: 'lcu@example.com',
                name: 'lcu',
                password: await bcrypt.hash('lcu', 10),
                dinasId: 1,
                roleId: 3,
            }
        });
    }
}