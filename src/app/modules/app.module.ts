import { Module } from '../../candy/web/common';
import { TypeOrmModule } from '../../candy/web/typeorm';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'shejijia',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    PhotoModule
  ]
})
export class ApplicationModule {}
