import * as mongoose from 'mongoose';
import { AppConfig } from './app.config.provider';

// использую конфиг и создаю подключение к бд

const dbConnectProvider = {
  provide: 'DATABASE_CONNECTION',
    useFactory: async (config: AppConfig) => {
      const connection = await mongoose.connect(config.database.url);
      return connection;
    },
      inject: ['CONFIG'],
    }

export default dbConnectProvider;
