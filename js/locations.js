const branches = {
  "Fibello Shop 3": {
    address: "Rr Mbreteresha Teute, Mitrovica e Veriut 40000",
    hours: "Every day 8 AM-9 PM",
    contact: "+38649400182"
  },
  "Fibello Concept": {
    address: "Mehe Uka, Sheshi, Agim Hajrizi, Mitrovica e Veriut 40000",
    hours: "Every day 7 AM-11 PM",
    contact: "048266050"
  },
  "Fibello Sweet Shop 6": {
    address: "Nene Tereza, Istog 31000",
    hours: "Every day 8 AM-9 PM",
    contact: "049400182"
  },
  "Fibello Sweet Shop 4": {
    address: "Rruge Ismail Qemajli, Vushtrri 42000",
    hours: "Working hours not known",
    contact: "+37744681101"
  },
  "Fibello Sweet Shop": {
    address: "XK, Hilmi Rakovica, Prishtine 10000",
    hours: "Working hours not known",
    contact: "049278777"
  },
  "Fibello Sweetshop 9": {
    address: "Rr, Ilir Konushevci, Prishtine 10000",
    hours: "Every day 8 AM-10 PM",
    contact: "049803737"
  }
};

const locationCard = document.querySelector("#location-card");
const mapPins = document.querySelectorAll(".map-pin");

function renderLocation(name) {
  const branch = branches[name];
  mapPins.forEach((pin) => pin.classList.toggle("active", pin.dataset.branch === name));
  locationCard.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Address:</strong> ${branch.address}</p>
    <p><strong>Working hours:</strong> ${branch.hours}</p>
    <p><strong>Phone:</strong> <a href="tel:${branch.contact.replaceAll(" ", "")}">${branch.contact}</a></p>
    <a class="frost-btn primary" href="contact.html">Contact This Location</a>
  `;
}

mapPins.forEach((pin) => {
  pin.addEventListener("click", () => {
    renderLocation(pin.dataset.branch);
  });
});

renderLocation("Fibello Shop 3");
