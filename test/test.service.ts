import { Injectable } from "@nestjs/common";
import { PrismaService } from "../src/common/service/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) {
    }

    async deleteUser() {
        await this.prismaService.user.deleteMany({
            where: {
                OR: [
                    { email: 'test@example.com' },
                    { email: 'testupdated@example.com' },
                ]
            }
        });
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
}