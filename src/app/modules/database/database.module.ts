import { Module } from '../../../candy/web/common';
import { databaseProviders } from './database.providers';

@Module({
  components: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule { }
