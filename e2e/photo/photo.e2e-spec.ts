import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PhotoModule } from '../../src/app/modules/photo/photo.module';
import { PhotoService } from '../../src/app/modules/photo/photo.service';

describe('Photos', () => {
  const server = express();
  server.use(bodyParser.json());

  const photoService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      modules: [PhotoModule]
    })
      .overrideComponent(PhotoService)
      .useValue(photoService)
      .compile();

    const app = module.createNestApplication(server);
    await app.init();
  });

  it(`/GET photos`, () => {
    return request(server)
      .get('/photos')
      .expect(200)
      .expect({
        data: photoService.findAll()
      });
  });
});
