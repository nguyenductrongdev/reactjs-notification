// Firebase Messaging Service Worker

self.addEventListener("push", (event) => {
    const pushContent = event.data.json();
    console.log(pushContent);

    const {title, body} = pushContent.notification;

    self.registration.showNotification(title, {
        body: body,
    }).catch((error) => {
        console.error(error);
    });
});