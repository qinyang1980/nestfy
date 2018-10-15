import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '../../candy/web/common';
import { PhotoModule } from './photo/photo.module';

@Module({
  modules: [PhotoModule]
})
export class ApplicationModule {}
