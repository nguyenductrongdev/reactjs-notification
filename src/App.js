import './App.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";
import {useState} from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBsTHR5C1xwo6ADx3g3hnItyvv8pVbi7A8",
  authDomain: "firstapp-694ee.firebaseapp.com",
  databaseURL: "https://firstapp-694ee-default-rtdb.firebaseio.com",
  projectId: "firstapp-694ee",
  storageBucket: "firstapp-694ee.firebasestorage.app",
  messagingSenderId: "359875677081",
  appId: "1:359875677081:web:fbb4d6c3388a7b5d426108",
  measurementId: "G-7R061Q77YH"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function App() {
  const [fcmToken, setFcmToken] = useState("");

  if(!fcmToken){
    navigator.serviceWorker.register("/sw.js").then(registration => {
      getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: 'BEi_Qpx8OA0cDxQ9DjtIW2OF8nHxwhdBU79hkiDjg5mKJQm4eK42OhsZWyWo5wYtIqDNRlnLmDRRaW7ZTHMqfEs'
      }).then((currentToken) => {
        if (currentToken) {
          setFcmToken(currentToken);
          console.log("Token is: " + currentToken);
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    });
  }

  return (
    <div className="App">
      <b>FCM Token:</b>
      <code>{fcmToken}</code>
    </div>
  );
}

export default App;
