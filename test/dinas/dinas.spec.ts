import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserTestService } from '../user/user.test.service';
import { UserTestModule } from '../user/user.test.module';
import { DinasTestService } from './dinas.test.service';
import { DinasTestModule } from './dinas.test.module';


describe('DinasController', () => {
    let app: INestApplication;
    let logger: Logger;
    let userTestService: UserTestService;
    let dinasTestService: DinasTestService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, UserTestModule, DinasTestModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        logger = app.get(WINSTON_MODULE_PROVIDER);
        userTestService = app.get(UserTestService);
        dinasTestService = app.get(DinasTestService);
    });

    afterEach(async () => {
        await userTestService.deleteMany();
        await dinasTestService.deleteDinas();
    });

    describe('POST /dinas', () => {
        let token: string;
        let responseLogin: any;

        beforeEach(async () => {
            await dinasTestService.deleteDinas();
            await userTestService.createSuperAdmin();
            await userTestService.createLCU()
            await userTestService.createUser();
            await userTestService.createSupervisor();
        });

        it('should be rejected if request is invalid', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'superadmin@example.com',
                    password: 'super admin',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .post('/dinas')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    dinas: '',
                });

            logger.info(response.body);

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });

        it('should be rejected if lcu create Dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'lcu@example.com',
                    password: 'lcu',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .post('/dinas')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    dinas: 'test'
                });
            
            logger.info(response.body);

            expect(response.status).toBe(403);
            expect(response.body.errors).toBeDefined();
        });

        it('should be rejected if user create Dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'test@example.com',
                    password: 'test',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .post('/dinas')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    dinas: 'test'
                });
            
            logger.info(response.body);

            expect(response.status).toBe(403);
            expect(response.body.errors).toBeDefined();
        });

        it('should be able to super admin create dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'superadmin@example.com',
                    password: 'super admin',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .post('/dinas')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    dinas: 'test'
                });
            
            logger.info(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.dinas).toBe('test');
        });

        it('should be able to supervisor create dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'supervisor@example.com',
                    password: 'supervisor',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .post('/dinas')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    dinas: 'test'
                });
            
            logger.info(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data.id).toBeDefined();
            expect(response.body.data.dinas).toBe('test');
        });
    });

    describe('GET /dinas', () => {
        let token: string;
        let responseLogin: any;

        beforeEach(async () => {
            await dinasTestService.deleteDinas();
            await userTestService.createSuperAdmin();
            await userTestService.createLCU()
            await userTestService.createUser();
            await userTestService.createSupervisor();
        });

        it('should be rejected if lcu get all dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'lcu@example.com',
                    password: 'lcu',
                });
            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .get('/dinas')
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(403);
            expect(response.body.errors).toBeDefined();
        });

        it('should be rejected if user get all dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'test@example.com',
                    password: 'test',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .get('/dinas')
                .set('Authorization', `Bearer ${token}`)

            logger.info(response.body);

            expect(response.status).toBe(403);
            expect(response.body.errors).toBeDefined();
        });

        it('should be able to super admin get all dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'superadmin@example.com',
                    password: 'super admin',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .get('/dinas')
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0].dinas).toBe('TA');
            expect(response.body.data[1].dinas).toBe('TC');
        });

        it('should be able to supervisor get all dinas', async () => {
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'supervisor@example.com',
                    password: 'supervisor',
                });
            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .get('/dinas')
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0].dinas).toBe('TA');
            expect(response.body.data[1].dinas).toBe('TC');
        });
    });

    describe('DELETE /dinas/:dinasId', () => {
        let token: string;
        let responseLogin: any;

        beforeEach(async () => {
            await dinasTestService.deleteDinas();
            await userTestService.createSuperAdmin();
            await userTestService.createLCU()
            await userTestService.createUser();
            await userTestService.createSupervisor();
            await dinasTestService.createDinas();
        });

        it('should be rejected if dinas not found', async () => {
            const dinas = await dinasTestService.getDinas();
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'supervisor@example.com',
                    password: 'supervisor',
                });
            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .delete(`/dinas/${dinas.id - dinas.id}`)
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(404);
            expect(response.body.errors).toBeDefined();
        });

        it('should be rejected if lcu delete dinas', async () => {
            const dinas = await dinasTestService.getDinas();
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'lcu@example.com',
                    password: 'lcu',
                });
            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .delete(`/dinas/${dinas.id}`)
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(403);
            expect(response.body.errors).toBeDefined();
        });

        it('should be rejected if user delete dinas', async () => {
            const dinas = await dinasTestService.getDinas();
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'test@example.com',
                    password: 'test',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .delete(`/dinas/${dinas.id}`)
                .set('Authorization', `Bearer ${token}`)

            logger.info(response.body);

            expect(response.status).toBe(403);
            expect(response.body.errors).toBeDefined();
        });

        it('should be able to super admin delete dinas', async () => {
            const dinas = await dinasTestService.getDinas();
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'superadmin@example.com',
                    password: 'super admin',
                });

            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .delete(`/dinas/${dinas.id}`)
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data).toBe(true);
        });

        it('should be able to supervisor delete dinas', async () => {
            const dinas = await dinasTestService.getDinas();
            responseLogin = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    identifier: 'supervisor@example.com',
                    password: 'supervisor',
                });
            token = responseLogin.body.data.token;
            const response = await request(app.getHttpServer())
                .delete(`/dinas/${dinas.id}`)
                .set('Authorization', `Bearer ${token}`)
            
            logger.info(response.body);

            expect(response.status).toBe(200);
            expect(response.body.data).toBe(true);
        });
    });
});
