import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });

  describe('POST /users', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          no_pegawai: '',
          nik: '',
          email: '',
          name: '',
          password: '',
          dinasId: '',
          roleId: '',
        });

        logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to user register user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          no_pegawai: 'test',
          nik: 'test',
          email: 'test@example.com',
          name: 'test',
          password: 'test',
          dinasId: 1,
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.no_pegawai).toBe('test');
      expect(response.body.data.nik).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.dinasId).toBe(1);
      expect(response.body.data.roleId).toBe(4);
    });

    it('should be rejected if no_pegawai already exists', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({
          no_pegawai: 'test',
          nik: 'abcd',
          email: 'test@example.com',
          name: 'test',
          password: 'test',
          dinasId: 1,
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /users/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({
          identifier: '',
          password: '',
        });

        logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login using email', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({
          identifier: 'test@example.com',
          password: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.no_pegawai).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.dinasId).toBeDefined();
      expect(response.body.data.roleId).toBeDefined();
    });

    it('should be able to login using no_pegawai', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({
          identifier: 'test',
          password: 'test',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.no_pegawai).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.dinasId).toBeDefined();
      expect(response.body.data.roleId).toBeDefined();
    });

  });

  describe('GET /users/current', () => {
    let token: string;

    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/users/login')
        .send({
          identifier: 'test@example.com',
          password: 'test',
        });
      token = response.body.data.token;
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/current')
        .set('Authorization', 'wrong');

        logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/current')
        .set('Authorization', `Bearer ${token}`);

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.no_pegawai).toBe('test');
      expect(response.body.data.email).toBe('test@example.com');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.dinasId).toBeDefined();
      expect(response.body.data.roleId).toBeDefined();
    });
  });
});
