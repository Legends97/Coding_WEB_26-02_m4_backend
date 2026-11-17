import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const pfad = req.originalUrl;         // originalUrl bleibt unverändert, req.url kürzt der Router

  // läuft erst, wenn die Antwort rausgegangen ist — dann steht der Status fest
  res.on("finish", () => {
    const dauer = Date.now() - start;
    console.log(`${req.method} ${pfad} → ${res.statusCode} (${dauer} ms)`);
  });

  next();                               // WICHTIG: sonst bleibt die Anfrage hängen
}
