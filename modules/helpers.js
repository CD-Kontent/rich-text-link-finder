// Displays messages and notifications to user
const notificationArea = document.getElementById("message");

function displayNotification(message, notificationType) {
  const notification = document.createElement("p");
  notification.textContent = message;
  notification.classList.add(
    "notification",
    `${notificationType}`,
    "is-light",
    "mx-5"
  );
  notificationArea.appendChild(notification);
}

function clearNotification() {
  notificationArea.innerHTML = "";
}

// Toggles progress bar on/off
function toggleProgress(state) {
  const progressBar = document.getElementById("progress");
  switch (state) {
    case "on":
      progressBar.hidden = false;
      break;
    case "off":
      progressBar.hidden = true;
      break;
  }
}

export { displayNotification, clearNotification, toggleProgress };
