import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RoleGuard } from "src/common/guard/role.guard";
import { PrismaService } from "src/common/service/prisma.service";
import { CapabilityService } from "./capability.service";
import { CapabilityController } from "./capability.controller";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('ACCESS_TOKEN'),
                signOptions: {
                    expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
                },
            }),
        }),
    ],
    providers: [
        AuthGuard,
        RoleGuard,
        PrismaService,
        CapabilityService,
    ],
    controllers: [CapabilityController],
})
export class CapabilityModule {

}