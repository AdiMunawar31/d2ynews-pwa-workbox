export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("✅ Service Worker registered:", registration);

          // Update service worker jika ada perubahan
          registration.addEventListener("updatefound", () => {
            console.log("🔄 New service worker update found!");
            const newWorker = registration.installing;
            newWorker?.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                console.log("⚡ New update available! Refresh for latest version.");
              }
            });
          });

          return registration.pushManager.getSubscription();
        })
        .then((subscription) => {
          if (subscription) {
            console.log("User sudah subscribe:", subscription);
          } else {
            console.log("User belum subscribe ke push notifications.");
          }
        }).catch((error) => console.error("❌ Service Worker registration failed:", error));
    });

    // Cek status online/offline
    window.addEventListener("online", () => console.log("🌐 Online"));
    window.addEventListener("offline", () => console.warn("⚠️ Offline: Using cached data"));
  }
}