import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';

const configs = {
  test: [
    {
      rootPath: path.join(__dirname, '..', '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
      serveStaticOptions: { index: false },
    },
  ],
  local: [
    {
      rootPath: path.join(__dirname, '..', '..', 'public', 'content', 'afisha'),
      serveRoot: '/',
      serveStaticOptions: { index: false },
    },
  ],
};

export const getStaticConfig = (configService: ConfigService) => {
  const staticMode = configService.get<string>('STATIC_MODE', 'test');
  return configs[staticMode] || configs.test;
};
