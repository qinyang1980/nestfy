import { createConnection } from '../../../candy/orm';
import { DB_CONNECTION_TOKEN } from '../constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => await createConnection({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hys_1234',
      database: 'test',
      logging: 'all',
      synchronize: true,
      entities: [
        `${__dirname}/../**/**.entity{.ts,.js}`
      ]
    })
  }
];
