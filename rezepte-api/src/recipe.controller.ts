import { Request, Response, NextFunction } from "express";
import { getAllRecipes, getRecipeById, createRecipe, deleteRecipe } from "./recipe.service";

export async function getRecipesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { maxMinuten } = req.query;

    if (typeof maxMinuten === "string") {
      const grenze = Number(maxMinuten);

      if (Number.isNaN(grenze)) {
        res.status(400).json({ fehler: "maxMinuten muss eine Zahl sein" });
        return;
      }

      res.json(await getAllRecipes(grenze));
      return;
    }

    const rezepte = await getAllRecipes();
    res.json(rezepte);
  } catch (err) {
    next(err);                          // Fehler weiterreichen (-> Error-Middleware in 1.3)
  }
}

export async function getRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);                     // req.params ist immer ein String
    const rezept = await getRecipeById(id);

    if (!rezept) {
      res.status(404).json({ fehler: "Rezept nicht gefunden" });
      return;                                             // sonst würden zwei Antworten rausgehen
    }

    res.json(rezept);
  } catch (err) {
    next(err);
  }
}

export async function createRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const neues = await createRecipe(req.body);
    res.status(201).json(neues);        // 201 = Created
  } catch (err) {
    next(err);
  }
}

export async function deleteRecipeHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const geloescht = await deleteRecipe(id);

    if (!geloescht) {
      res.status(404).json({ fehler: "Rezept nicht gefunden" });
      return;
    }

    res.status(204).send();             // 204 = No Content, kein Body
  } catch (err) {
    next(err);
  }
}
