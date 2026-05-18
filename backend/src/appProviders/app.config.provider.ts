import { ConfigService } from "@nestjs/config"

//TODO прочесть переменнные среды
export const configProvider = {
    provide: 'CONFIG',
    useFactory: (configService: ConfigService): AppConfig => {
     return {
      database: {
        url: configService.get<string>('DATABASE_URL', 'mongodb://localhost:27017/prac'),
        driver: configService.get<string>('DATABASE_DRIVER', 'mongodb'),
      }
    }
  },
  inject: [ConfigService]
}

export interface AppConfig {
    database: AppConfigDatabase
}

export interface AppConfigDatabase {
    driver: string
    url: string
}
