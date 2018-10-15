import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

describe('PhotoController', () => {
  let photoController: PhotoController;
  let photoService: PhotoService;

  beforeEach(async () => {
    photoService = new PhotoService(new Repository<Photo>());
    photoController = new PhotoController(photoService);
  });

  describe('findAll', () => {
    it('should return an array of photos', async () => {
      const result = ['test'];
      jest.spyOn(photoService, 'findAll').mockImplementation(() => result);

      const ret = await photoController.findAll();
      expect(ret).toBe(result);
    });
  });
});
