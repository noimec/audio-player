import { DataSource } from 'typeorm';
import { DatabaseConfiguration } from './database.configuration';

const databaseConfig = new DatabaseConfiguration();
const dataSource = new DataSource(databaseConfig.createTypeOrmOptions());

export default dataSource; 