import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { PhotoModule } from '../../src/app/modules/photo/photo.module';
import { PhotoService } from '../../src/app/modules/photo/photo.service';

describe('Photos', () => {
  let app: INestApplication;
  const photoService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [PhotoModule]
    })
      .overrideProvider(PhotoService)
      .useValue(photoService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET photos`, () => {
    return request(app.getHttpServer())
      .get('/photos')
      .expect(200)
      .expect({
        data: photoService.findAll()
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
