import express from "express";
import recipeRoutes from "./recipe.routes";
import { logger } from "./logger.middleware";

const app = express();

app.use(logger);                      // vor den Routen -> sieht jede Anfrage
app.use(express.json());              // JSON im Request-Body lesen

app.get("/", (req, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/recipes", recipeRoutes);    // alle Rezept-Routen hängen unter /recipes

export default app;                   // die fertige App exportieren (NICHT starten)
