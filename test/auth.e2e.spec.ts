import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { INestApplication } from '@nestjs/common';

describe('Auth', () => {
  let app: INestApplication;
  let authService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/POST login`, () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        "email": "dummy@gmail.com",
        "password": "dummy"
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('token') // true
      });
  });

  it(`/POST Register`, () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({
        "email": "dummy@gmail.com",
        "password": "dummy"
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('token') // true
      });
  });

  afterAll(async () => {
    await app.close();
  });
});