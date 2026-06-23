import { ADMIN_EMAIL, getDesserts, money, saveDesserts } from "./data.js";

const adminLogin = document.querySelector("#admin-login");
const adminPanel = document.querySelector("#admin-panel");
const dessertForm = document.querySelector("#dessert-form");
const adminDesserts = document.querySelector("#admin-desserts");

function renderAdminDesserts() {
  adminDesserts.innerHTML = getDesserts()
    .map(
      (dessert) => `
        <article class="admin-item">
          <img src="${dessert.image}" alt="">
          <div>
            <strong>${dessert.name}</strong>
            <div>${Number.isFinite(Number(dessert.price)) ? money(dessert.price) : "No price shown"}</div>
          </div>
          <div class="admin-actions">
            <button type="button" data-edit="${dessert.id}">Edit</button>
            <button type="button" data-remove="${dessert.id}">Remove</button>
          </div>
        </article>
      `
    )
    .join("");
}

function showAdminPanel() {
  adminLogin.hidden = true;
  adminPanel.hidden = false;
  renderAdminDesserts();
}

adminLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = new FormData(adminLogin).get("email").toLowerCase().trim();
  const status = adminLogin.querySelector(".form-status");

  if (email === ADMIN_EMAIL) {
    localStorage.setItem("fibelloAdmin", "true");
    showAdminPanel();
  } else {
    status.textContent = "Use the Fibello business email to continue.";
  }
});

dessertForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(dessertForm);
  const upload = formData.get("upload");
  let image = formData.get("image").trim();

  if (upload && upload.size) {
    image = await fileToDataUrl(upload);
  }

  const dessert = {
    id: formData.get("id") || crypto.randomUUID(),
    name: formData.get("name").trim(),
    price: Number(formData.get("price")),
    description: formData.get("description").trim(),
    image: image || "fibellosweets/sweets/Fibello Crepe.jpg"
  };

  const desserts = getDesserts();
  const existingIndex = desserts.findIndex((item) => item.id === dessert.id);

  if (existingIndex >= 0) {
    desserts[existingIndex] = dessert;
  } else {
    desserts.unshift(dessert);
  }

  saveDesserts(desserts);
  renderAdminDesserts();
  dessertForm.reset();
  dessertForm.elements.id.value = "";
});

adminDesserts.addEventListener("click", (event) => {
  const editId = event.target.dataset.edit;
  const removeId = event.target.dataset.remove;
  const desserts = getDesserts();

  if (editId) {
    const dessert = desserts.find((item) => item.id === editId);
    dessertForm.elements.id.value = dessert.id;
    dessertForm.elements.name.value = dessert.name;
    dessertForm.elements.price.value = dessert.price || "";
    dessertForm.elements.description.value = dessert.description || "";
    dessertForm.elements.image.value = dessert.image.startsWith("data:") ? "" : dessert.image;
  }

  if (removeId) {
    saveDesserts(desserts.filter((item) => item.id !== removeId));
    renderAdminDesserts();
  }
});

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

if (localStorage.getItem("fibelloAdmin") === "true") {
  showAdminPanel();
}
