import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthGuard } from "../common/guard/auth.guard";
import { PrismaService } from "../common/service/prisma.service";
import { RoleGuard } from "../common/guard/role.guard";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../config/constants";

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [
        UserService,
        AuthGuard,
        RoleGuard,
        PrismaService,
    ],
    controllers: [UserController,],
})
export class UserModule {

}