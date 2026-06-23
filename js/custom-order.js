import { money } from "./data.js";

const cakeForm = document.querySelector("#cake-form");
const cakePreview = document.querySelector("#cake-preview");
const candlesPreview = document.querySelector("#candles-preview");
const cakePrice = document.querySelector("#cake-price");
const toppingPreview = document.querySelector("#topping-preview");
const drizzlePreview = document.querySelector("#drizzle-preview");
const decorationPreview = document.querySelector("#decoration-preview");
const estimatedTotalInput = document.querySelector("#estimated-total");
const writingSelect = cakeForm.elements.writing;
const writingText = cakeForm.elements.text;
const cakeColorPicker = cakeForm.elements.cakeColor;
const defaultCakeColor = "#f5d49b";

const icingColors = {
  None: "#fff0cc",
  "Vanilla Cream": "#fff0cc",
  "Chocolate Ganache": "#7b4334",
  "Strawberry Buttercream": "#f7d7c3",
  "Caramel Whip": "#d6ad60"
};

const cakeColors = {
  None: defaultCakeColor,
  "Vanilla Bean": "#f5d49b",
  "Chocolate Fudge": "#633329",
  "Red Velvet": "#9f2230",
  "Lemon Cloud": "#f7df7a"
};

const shapeClasses = {
  Round: "shape-round",
  Square: "shape-square",
  Heart: "shape-heart",
  Custom: "shape-custom"
};

const shapePrices = {
  Round: 5,
  Square: 5,
  Heart: 5,
  Custom: 5
};

const decorationPrices = {
  None: 0,
  "Fresh Berries": 2,
  "Chocolate Drizzle": 2,
  "Gold Sprinkles": 2,
  "Floral Piping": 2
};

const toppingPrices = {
  None: 0,
  Macarons: 3,
  Truffles: 3,
  "Fruit Crown": 3,
  "Cookie Crumble": 3
};

function updateCake() {
  const data = new FormData(cakeForm);
  const shape = data.get("shape");
  const flavor = data.get("flavor");
  const layers = Number(data.get("layers"));
  const size = Number(data.get("size"));
  const candles = Number(data.get("candles"));
  const decorations = data.get("decorations");
  const toppings = data.get("toppings");
  const base = 28 + size * 3 + layers * 9 + candles * 1.5 + shapePrices[shape] + decorationPrices[decorations] + toppingPrices[toppings];
  const stackHeight = 76 + (layers - 1) * 64;

  cakePreview.style.setProperty("--icing", icingColors[data.get("icing")]);
  const selectedCakeColor = flavor === "Custom Color" ? cakeColorPicker.value : cakeColors[flavor];
  cakePreview.style.setProperty("--cake-color", selectedCakeColor);
  cakePreview.style.setProperty("--cake-scale", String(0.92 + size / 40));
  cakePreview.style.setProperty("--topping-bottom", `${stackHeight + 14}px`);
  cakePreview.style.setProperty("--drizzle-bottom", `${stackHeight - 18}px`);
  cakePreview.style.setProperty("--decoration-bottom", `${Math.max(30, stackHeight - 84)}px`);
  cakePreview.classList.remove(...Object.values(shapeClasses));
  cakePreview.classList.add(shapeClasses[shape]);
  cakePreview.dataset.layers = String(layers);
  cakePreview.dataset.topping = toppings.toLowerCase().replaceAll(" ", "-");
  cakePreview.dataset.decoration = decorations.toLowerCase().replaceAll(" ", "-");
  cakePreview.querySelector(".layer-one").classList.toggle("hidden-layer", layers < 1);
  cakePreview.querySelector(".layer-two").classList.toggle("hidden-layer", layers < 2);
  cakePreview.querySelector(".layer-three").classList.toggle("hidden-layer", layers < 3);
  candlesPreview.style.bottom = `${stackHeight + 26}px`;
  candlesPreview.innerHTML = Array.from({ length: Math.min(candles, 6) }, () => "<i></i>").join("");
  toppingPreview.innerHTML = toppingMarkup(toppings);
  drizzlePreview.className = `drizzle-preview ${decorations === "Chocolate Drizzle" ? "show-drizzle" : ""}`;
  decorationPreview.innerHTML = decorationMarkup(decorations);
  writingText.disabled = writingSelect.value === "None";
  if (writingText.disabled) {
    writingText.value = "";
  }
  cakePrice.textContent = money(base);
  estimatedTotalInput.value = cakePrice.textContent;
  cakePreview.classList.remove("preview-pop");
  requestAnimationFrame(() => cakePreview.classList.add("preview-pop"));
}

function toppingMarkup(toppings) {
  const options = {
    None: [],
    Macarons: ["macaron", "macaron peach", "macaron cocoa"],
    Truffles: ["truffle", "truffle", "truffle"],
    "Fruit Crown": ["berry", "citrus", "berry", "citrus"],
    "Cookie Crumble": ["crumb", "crumb", "crumb", "crumb", "crumb"]
  };

  return options[toppings].map((item) => `<span class="${item}"></span>`).join("");
}

function decorationMarkup(decorations) {
  if (decorations === "None") {
    return "";
  }
  if (decorations === "Fresh Berries") {
    return '<span class="berry decor-left"></span><span class="berry decor-right"></span>';
  }
  if (decorations === "Gold Sprinkles") {
    return Array.from({ length: 16 }, (_, index) => `<span class="sprinkle" style="--i:${index}"></span>`).join("");
  }
  if (decorations === "Floral Piping") {
    return '<span class="flower decor-left"></span><span class="flower decor-mid"></span><span class="flower decor-right"></span>';
  }
  return "";
}

function setDateMinimum() {
  const soonest = new Date();
  soonest.setDate(soonest.getDate() + 3);
  cakeForm.elements.date.min = soonest.toISOString().split("T")[0];
}

cakeForm.addEventListener("input", updateCake);
cakeForm.addEventListener("change", updateCake);
cakeColorPicker.addEventListener("input", () => {
  cakeForm.elements.flavor.value = "Custom Color";
  updateCake();
});
cakeForm.querySelectorAll('input[name="flavor"]').forEach((option) => {
  option.addEventListener("change", () => {
    if (option.value === "None" && option.checked) {
      cakeColorPicker.value = defaultCakeColor;
    }
  });
});
cakeForm.querySelectorAll(".option-card").forEach((card) => {
  card.addEventListener("click", () => requestAnimationFrame(updateCake));
});

cakeForm.addEventListener("submit", (event) => {
  if (writingSelect.value === "None") {
    writingText.value = "";
  }
  const formData = new FormData(cakeForm);
  const order = Object.fromEntries(formData.entries());
  const total = cakePrice.textContent;
  const orders = JSON.parse(localStorage.getItem("fibelloOrders") || "[]");
  orders.push({ ...order, total });
  localStorage.setItem("fibelloOrders", JSON.stringify(orders));
  cakeForm.querySelector(".form-status").textContent = "Sending your custom order...";
});

setDateMinimum();
updateCake();
