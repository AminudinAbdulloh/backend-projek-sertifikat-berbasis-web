import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Roles } from "../common/decorator/role.decorator";
import { AuthGuard } from "../common/guard/auth.guard";
import { RoleGuard } from "../common/guard/role.guard";
import { CreateRoleRequest, RoleResponse } from "../model/role.model";
import { WebResponse } from "../model/web.model";

@Controller("/roles")
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post()
    @HttpCode(200)
    @Roles('super admin', 'supervisor')
    @UseGuards(AuthGuard, RoleGuard)
    async create(@Body() req: CreateRoleRequest): Promise<WebResponse<RoleResponse>> {
        const result = await this.roleService.create(req);
        return {
            data: result,
        }
    }

    @Get()
    @HttpCode(200)
    @Roles('super admin', 'supervisor')
    @UseGuards(AuthGuard, RoleGuard)
    async getAll(): Promise<WebResponse<RoleResponse[]>> {
        const result = await this.roleService.getAll();
        return {
            data: result,
        }
    }
}