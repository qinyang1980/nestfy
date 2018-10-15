import { Module } from '../../../candy/web/common';
import { DatabaseModule } from '../database/database.module';
import { PhotoController } from './photo.controller';
import { photoProviders } from './photo.providers';
import { PhotoService } from './photo.service';

@Module({
  modules: [DatabaseModule],
  controllers: [PhotoController],
  components: [
    ...photoProviders,
    PhotoService
  ],
  exports: [PhotoService]
})
export class PhotoModule { }
