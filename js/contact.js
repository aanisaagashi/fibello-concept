const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", (event) => {
  contactForm.querySelector(".form-status").textContent = "Sending your message...";
});
