const form = document.querySelector(".form-style2");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch("https://formspree.io/f/xeepqzvl", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  const messageBox = document.querySelector(".form-messages");

  if (response.ok) {
    messageBox.innerHTML = "✅ Message envoyé avec succès !";
    form.reset();
  } else {
    messageBox.innerHTML = "❌ Une erreur est survenue.";
  }
});