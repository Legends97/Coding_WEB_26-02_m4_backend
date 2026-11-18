import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(`${err.name}: ${err.message}`);           // im Terminal protokollieren

  const status = err.status ?? 500;                        // kein eigener Status -> Serverfehler
  res.status(status).json({ fehler: err.message });
}
