import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NormalizePathMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Заменяем все двойные и более слеши на одинарные
    req.url = req.url.replace(/\/{2,}/g, '/');
    next();
  }
}