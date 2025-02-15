self.addEventListener("push", (event) => {
    const data = event.data.json();
    
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: "/vite.svg",
        data: { url: "/admin" }, // Store the admin panel URL
    });
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close(); // Close the notification

    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            // If admin panel is already open, focus on it
            for (const client of clientList) {
                if (client.url.includes("/admin") && "focus" in client) {
                    return client.focus();
                }
            }

            // If admin panel is not open, open a new tab
            if (clients.openWindow) {
                return clients.openWindow("/admin");
            }
        })
    );
});
