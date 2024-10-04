import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export class DatabaseConfiguration {
  createTypeOrmOptions(): DataSourceOptions {
    return {
      type: 'sqlite',
      database: 'data/database.db',
      synchronize: false,
      logging: false,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'migrations/**/*.{js,ts}')],
    };
  }
}

export default DatabaseConfiguration;