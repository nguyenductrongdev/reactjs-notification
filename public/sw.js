// Firebase Messaging Service Worker

self.addEventListener("push", (event) => {
    const notif = event.data.json().data;

    const {title, body} = notif;
    console.log(notif);

    self.registration.showNotification(title, {
        body: body,
    }).catch((error) => {
        console.error(error);
    });
});