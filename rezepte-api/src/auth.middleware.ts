import { Request, Response, NextFunction } from "express";

const API_KEY = "geheim123";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const schluessel = req.header("x-api-key");             // undefined, wenn der Header fehlt

  if (schluessel !== API_KEY) {
    res.status(401).json({ fehler: "Nicht autorisiert" }); // Abbruch, kein next()
    return;
  }

  next();                                                 // weiter zum Controller
}
