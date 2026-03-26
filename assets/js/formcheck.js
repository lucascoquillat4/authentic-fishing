// Initialize EmailJS
emailjs.init({
  publicKey: "jCi7SVxDLhjSZXkRX"
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-messages");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset message styles
    messageBox.style.display = "block";
    messageBox.textContent = "Sending...";
    messageBox.style.color = "#333";
    messageBox.style.padding = "12px 16px";
    messageBox.style.borderRadius = "4px";
    messageBox.style.backgroundColor = "#f0f0f0";
    messageBox.style.border = "1px solid #ddd";
    messageBox.style.marginTop = "15px";

    // Disable submit button while sending
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(
      "service_m2e56po",
      "template_z5dgykg",
      form
    )
    .then(function () {
      // Success message
      messageBox.textContent = "✓ Message sent successfully!";
      messageBox.style.color = "#ffffff";
      messageBox.style.backgroundColor = "#28a745";
      messageBox.style.border = "1px solid #218838";
      
      // Show popup alert
      showNotification("Message sent successfully!", "success");
      
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      // Clear message after 5 seconds
      setTimeout(function () {
        messageBox.style.display = "none";
      }, 5000);
    })
    .catch(function (error) {
      // Error message
      messageBox.textContent = "✗ Error sending message. Please try again.";
      messageBox.style.color = "#ffffff";
      messageBox.style.backgroundColor = "#dc3545";
      messageBox.style.border = "1px solid #c82333";
      
      // Show popup alert
      showNotification("Error sending message. Please try again.", "error");
      
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      console.error("EmailJS Error:", error);
      
      // Clear message after 5 seconds
      setTimeout(function () {
        messageBox.style.display = "none";
      }, 5000);
    });
  });
});

// Function to show notification popup
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.right = "20px";
  notification.style.padding = "16px 24px";
  notification.style.borderRadius = "8px";
  notification.style.fontSize = "16px";
  notification.style.fontWeight = "500";
  notification.style.zIndex = "10000";
  notification.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  notification.style.animation = "slideIn 0.3s ease-out";
  
  if (type === "success") {
    notification.style.backgroundColor = "#28a745";
    notification.style.color = "#ffffff";
  } else if (type === "error") {
    notification.style.backgroundColor = "#dc3545";
    notification.style.color = "#ffffff";
  }
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Add animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  if (!document.querySelector("style[data-email-animation]")) {
    style.setAttribute("data-email-animation", "true");
    document.head.appendChild(style);
  }
  
  // Remove notification after 4 seconds
  setTimeout(function () {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(function () {
      notification.remove();
    }, 300);
  }, 4000);
}