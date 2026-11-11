import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('💥 Error no controlado en el servidor:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocurrió un error interno en el servidor.';

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString()
  });
}

