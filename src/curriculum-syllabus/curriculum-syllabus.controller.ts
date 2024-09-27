import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { CurriculumSyllabusService } from "./curriculum-syllabus.service";
import { CreateCurriculumSyllabus } from "src/model/curriculum-syllabus.model";
import { buildResponse, WebResponse } from "src/model/web.model";
import { Roles } from "src/common/decorator/role.decorator";
import { AuthGuard } from "src/common/guard/auth.guard";
import { RoleGuard } from "src/common/guard/role.guard";

@Controller('/curriculum-syllabus')
export class CurriculumSyllabusController {
    constructor(private readonly curriculumSyllabusService: CurriculumSyllabusService) { }

    @Post()
    @HttpCode(200)
    @Roles('super admin')
    @UseGuards(AuthGuard, RoleGuard)
    async create(@Body() request: CreateCurriculumSyllabus): Promise<WebResponse<any>> {
        const result = await this.curriculumSyllabusService.createCurriculumSyllabus(request);
        return buildResponse(HttpStatus.OK, result);
    }
}