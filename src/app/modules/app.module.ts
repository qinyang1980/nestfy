import { Module } from '../../candy/web/common';
import { TypeOrmModule } from '../../candy/web/typeorm';
import { PhotoModule } from './photo/photo.module';

@Module({
  modules: [TypeOrmModule.forRoot(), PhotoModule]
})
export class ApplicationModule {}
