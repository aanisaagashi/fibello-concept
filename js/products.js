import { getDesserts } from "./data.js";

const dessertGrid = document.querySelector("#dessert-grid");

function renderDesserts() {
  if (!dessertGrid) return;

  dessertGrid.innerHTML = getDesserts()
    .map(
      (dessert, index) => `
        <article class="dessert-card" style="--card-index: ${index}">
          <img src="${dessert.image}" alt="${dessert.name}">
          <div class="dessert-card-body">
            <h3>${dessert.name}</h3>
          </div>
        </article>
      `
    )
    .join("");
}

renderDesserts();
