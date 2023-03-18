import './config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { TypeOrmConfigService } from './typeorm.service';

const typeormConfigurationService = new TypeOrmConfigService();

const dataSourceConfiguration =
  typeormConfigurationService.createTypeOrmOptions();

export const connectionSource = new DataSource(
  dataSourceConfiguration as DataSourceOptions,
);
