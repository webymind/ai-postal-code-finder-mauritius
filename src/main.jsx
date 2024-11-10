import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  // Save the event for triggering later
  deferredPrompt = e;

  // Show your custom install button here or trigger the install prompt manually
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    installButton.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA prompt");
      } else {
        console.log("User dismissed the PWA prompt");
      }
      deferredPrompt = null;
    });
  });
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
