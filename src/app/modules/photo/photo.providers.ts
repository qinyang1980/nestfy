import { Connection, Repository } from '../../../candy/orm';
import { DB_CONNECTION_TOKEN, PHOTO_REP_TOKEN } from '../constants';
import { Photo } from './photo.entity';

export const photoProviders = [
  {
    provide: PHOTO_REP_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Photo),
    inject: [DB_CONNECTION_TOKEN]
  }
];
