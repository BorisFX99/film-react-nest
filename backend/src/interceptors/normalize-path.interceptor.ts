import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class NormalizePathInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    // Нормализуем URL
    const originalUrl = request.url;
    request.url = request.url.replace(/\/{2,}/g, '/');

    if (originalUrl !== request.url) {
      console.log(`🔧 Normalized: ${originalUrl} → ${request.url}`);
    }
    return next.handle();
  }
}