// Firebase Messaging Service Worker

self.addEventListener("push", (event) => {
    const notif = event.data.json().data;
    console.log(`${notif.title}: ${notif.body}`);
    const channel = new BroadcastChannel('notifications');
    channel.postMessage(notif);
});