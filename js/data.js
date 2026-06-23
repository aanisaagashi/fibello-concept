export const ADMIN_EMAIL = "hello@fibellosweets.com";
export const FORM_EMAIL = "anikajanuzi0@gmail.com";
const DESSERT_SEED_VERSION = "fibello-sweets-v2";

export const fallbackDesserts = [
  {
    id: crypto.randomUUID(),
    name: "Lime Cocktail",
    image: "fibellosweets/sweets/Lime Cocktail.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Fibello Crepe",
    image: "fibellosweets/sweets/Fibello Crepe.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Coffee",
    image: "fibellosweets/sweets/Coffee.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Choconuts",
    image: "fibellosweets/sweets/Choconuts.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Cheesecake Amerikan",
    image: "fibellosweets/sweets/Cheesecake Amerikan.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Bkllav Speciale",
    image: "fibellosweets/sweets/Bkllav Speciale.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Passion Fruit",
    image: "fibellosweets/sweets/Passion Fruit.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Nutella",
    image: "fibellosweets/sweets/Nutella.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Milka",
    image: "fibellosweets/sweets/Milka.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Piramida",
    image: "fibellosweets/sweets/Piramida.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Strawberry Cheesecake",
    image: "fibellosweets/sweets/Strawberry Cheesecake.jpg"
  },
  {
    id: crypto.randomUUID(),
    name: "Tofiffee",
    image: "fibellosweets/sweets/Tofiffee.jpg"
  }
];

export function getDesserts() {
  const saved = localStorage.getItem("fibelloDesserts");
  const seedVersion = localStorage.getItem("fibelloDessertSeedVersion");
  if (!saved || seedVersion !== DESSERT_SEED_VERSION) {
    localStorage.setItem("fibelloDesserts", JSON.stringify(fallbackDesserts));
    localStorage.setItem("fibelloDessertSeedVersion", DESSERT_SEED_VERSION);
    return fallbackDesserts;
  }
  return JSON.parse(saved);
}

export function saveDesserts(desserts) {
  localStorage.setItem("fibelloDesserts", JSON.stringify(desserts));
}

export function money(value) {
  return Number(value).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
