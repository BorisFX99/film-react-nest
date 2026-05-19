import { Request, Response, NextFunction } from 'express';

export const normalizePathMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalUrl = req.url;
  req.url = req.url.replace(/\/{2,}/g, '/');

  if (originalUrl !== req.url) {
    console.log(`Normalized: ${originalUrl} → ${req.url}`);
  }

  next();
};
