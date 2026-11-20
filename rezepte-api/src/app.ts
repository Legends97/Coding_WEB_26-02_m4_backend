import express from "express";
import recipeRoutes from "./recipe.routes.js";
import { logger } from "./logger.middleware.js";
import { errorHandler } from "./error.middleware.js";

const app = express();

app.use(logger);                      // vor den Routen -> sieht jede Anfrage
app.use(express.json());              // JSON im Request-Body lesen

app.get("/", (req, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Bonus: absichtlich kaputte Route — der Server muss das überleben
app.get("/crash", (req, res) => {
  throw new Error("Absichtlicher Absturz zum Testen");
});

app.use("/recipes", recipeRoutes);    // alle Rezept-Routen hängen unter /recipes

// greift nur, wenn keine Route darüber gepasst hat
app.use((req, res) => {
  res.status(404).json({ fehler: `Route ${req.method} ${req.originalUrl} existiert nicht` });
});

app.use(errorHandler);                // muss NACH den Routen stehen

export default app;                   // die fertige App exportieren (NICHT starten)
