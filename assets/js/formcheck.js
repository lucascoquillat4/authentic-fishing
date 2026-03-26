emailjs.init({
  publicKey: "jCi7SVxDLhjSZXkRX"
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-messages");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    messageBox.textContent = "Sending...";

    emailjs.sendForm(
      "service_m2e56po",
      "template_z5dgykg",
      form
    )
    .then(function () {
      messageBox.textContent = "Message sent successfully.";
      messageBox.style.color = "green";
      form.reset();
    })
    .catch(function (error) {
      messageBox.textContent = "Error, try again.";
      messageBox.style.color = "red";
      console.error(error);
    });
  });
});