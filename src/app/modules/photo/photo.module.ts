import { Module } from '../../../candy/web/common';
import { TypeOrmModule } from '../../../candy/web/typeorm';
import { PhotoController } from './photo.controller';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService],
  controllers: [PhotoController]
})
export class PhotoModule {}
