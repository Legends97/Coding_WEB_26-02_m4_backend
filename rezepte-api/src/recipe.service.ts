import { RecipeNotFoundError, ValidationError } from "./errors.js";

export type Rezept = {
  id: number;
  titel: string;
  minuten: number;
  portionen: number;
  zutaten?: string[];
  anleitung?: string;
  bewertung?: number;
  vegetarisch?: boolean;
};

let naechsteId = 6;                     // 1-5 sind unten schon belegt

let rezepte: Rezept[] = [
  {
    id: 1,
    titel: "Spaghetti Carbonara",
    minuten: 20,
    portionen: 2,
    zutaten: ["200 g Spaghetti", "100 g Guanciale", "2 Eigelb", "50 g Pecorino", "schwarzer Pfeffer"],
    anleitung:
      "Spaghetti salzig kochen. Guanciale knusprig auslassen. Eigelb mit Pecorino verrühren. Nudeln vom Herd mit Speck und Eimasse mischen, mit Nudelwasser cremig rühren.",
    bewertung: 4.8,
    vegetarisch: false,
  },
  {
    id: 2,
    titel: "Linsen-Curry",
    minuten: 30,
    portionen: 4,
    zutaten: ["250 g rote Linsen", "400 ml Kokosmilch", "1 Zwiebel", "2 EL Currypaste", "1 Dose Tomaten"],
    anleitung:
      "Zwiebel anbraten, Currypaste kurz mitrösten. Linsen, Tomaten und Kokosmilch zugeben und 20 Minuten köcheln, bis die Linsen weich sind. Mit Salz und Limette abschmecken.",
    bewertung: 4.5,
    vegetarisch: true,
  },
  {
    id: 3,
    titel: "Caprese-Salat",
    minuten: 10,
    portionen: 2,
    zutaten: ["3 Tomaten", "250 g Mozzarella", "frisches Basilikum", "Olivenöl", "Salz"],
    anleitung: "Tomaten und Mozzarella in Scheiben schneiden, abwechselnd schichten, mit Basilikum, Öl und Salz anrichten.",
    bewertung: 4.2,
    vegetarisch: true,
  },
  {
    id: 4,
    titel: "Ofen-Lachs mit Gemüse",
    minuten: 35,
    portionen: 3,
    zutaten: ["3 Lachsfilets", "2 Zucchini", "1 Paprika", "1 Zitrone", "Olivenöl", "Thymian"],
    anleitung:
      "Gemüse in Stücke schneiden, ölen, salzen und 15 Minuten bei 200 °C vorbacken. Lachs darauf legen, mit Zitrone und Thymian belegen, weitere 15 Minuten garen.",
    bewertung: 4.6,
    vegetarisch: false,
  },
  {
    id: 5,
    titel: "Pfannkuchen",
    minuten: 15,
    portionen: 2,
    zutaten: ["200 g Mehl", "400 ml Milch", "2 Eier", "1 Prise Salz", "Butter zum Braten"],
    anleitung: "Alle Zutaten zu einem glatten Teig verrühren und 10 Minuten ruhen lassen. In heißer Butter portionsweise goldbraun ausbacken.",
    bewertung: 4.0,
    vegetarisch: true,
  },
];

// Alle Rezepte — optional nur die, die höchstens `maxMinuten` dauern
export async function getAllRecipes(maxMinuten?: number): Promise<Rezept[]> {
  if (maxMinuten === undefined) {
    return rezepte;
  }

  return rezepte.filter((rezept) => rezept.minuten <= maxMinuten);
}

// Ein Rezept über die id — wirft RecipeNotFoundError, wenn es keins gibt
export async function getRecipeById(id: number): Promise<Rezept> {
  const rezept = rezepte.find((eintrag) => eintrag.id === id);

  if (!rezept) {
    throw new RecipeNotFoundError(id);
  }

  return rezept;
}

// Neues Rezept anlegen — die id vergibt der Service selbst
export async function createRecipe(daten: Omit<Rezept, "id">): Promise<Rezept> {
  if (typeof daten?.titel !== "string" || daten.titel.trim() === "") {
    throw new ValidationError("Ein Rezept braucht einen Titel");
  }

  const neues: Rezept = { id: naechsteId++, ...daten };
  rezepte.push(neues);
  return neues;
}

// Rezept löschen — true, wenn wirklich eins entfernt wurde
export async function deleteRecipe(id: number): Promise<boolean> {
  const vorher = rezepte.length;
  rezepte = rezepte.filter((rezept) => rezept.id !== id);
  return rezepte.length < vorher;
}
