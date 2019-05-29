import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import config from '../common/config';
import { PhotoModule } from './photo/photo.module';

@Module({
  // imports: [TypeOrmModule.forRoot(config.mysql as ConnectionOptions), PhotoModule]
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PhotoModule,
  ],
})
export class ApplicationModule {}
