import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { FilmsModule } from './films.module';
import { FilmsService } from './films.service';
import { INestApplication } from '@nestjs/common';

describe('Auth', () => {
    let app: INestApplication;
    let filmService = { findAll: () => ['test'] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [FilmsModule],
        })
            .overrideProvider(FilmsService)
            .useValue(filmService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/POST film create`, () => {
        return request(app.getHttpServer())
            .post('/create')
            .send({
                "name": "movie 3",
                "description": "movie nice",
                "ticketPrice": 110,
                "rating": 3,
                "country": "INDIA",
                "genre": "HORROR",
                "releaseDate": "2021-08-17"
            })
            .expect(200)
            .expect((response) => {
                expect(response.body).toHaveProperty('name') // true
                expect(response.body).toHaveProperty('description') // true
                expect(response.body).toHaveProperty('_id') // true
                expect(response.body).toHaveProperty('ticketPrice') // true
                expect(response.body).toHaveProperty('country') // true
                expect(response.body).toHaveProperty('genre') // true
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