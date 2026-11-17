import express from "express";

type Rezept = {
  id: number;
  titel: string;
  minuten: number;
  portionen: number;
  zutaten: string[];
  anleitung: string;
  bewertung: number;
  vegetarisch: boolean;
};

const rezepte: Rezept[] = [
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

const app = express();
app.use(express.json());        // erlaubt dem Server, JSON im Request-Body zu lesen

// Begrüßung auf der Startseite
app.get("/", (req, res) => {
  res.send("Willkommen bei der Rezepte-API 👋");
});

// Health-Check: läuft der Server?
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Alle Rezepte — optional gefiltert mit ?maxMinuten=20
app.get("/recipes", (req, res) => {
  const { maxMinuten } = req.query;

  if (typeof maxMinuten === "string") {
    const grenze = Number(maxMinuten);

    if (Number.isNaN(grenze)) {
      res.status(400).json({ fehler: "maxMinuten muss eine Zahl sein" });
      return;
    }

    res.json(rezepte.filter((rezept) => rezept.minuten <= grenze));
    return;
  }

  res.json(rezepte);
});

// Ein einzelnes Rezept über die ID
app.get("/recipes/:id", (req, res) => {
  const id = Number(req.params.id);                       // req.params ist immer ein String
  const rezept = rezepte.find((eintrag) => eintrag.id === id);

  if (!rezept) {
    res.status(404).json({ fehler: "Rezept nicht gefunden" });
    return;                                               // sonst würden zwei Antworten rausgehen
  }

  res.json(rezept);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
