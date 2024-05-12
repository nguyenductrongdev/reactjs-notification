import logo from './logo.svg';
import './App.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ72GZvfYH1Mz0WHImkKA6pdZvHxCiZ3I",
  authDomain: "springbootnotifapplication.firebaseapp.com",
  projectId: "springbootnotifapplication",
  storageBucket: "springbootnotifapplication.appspot.com",
  messagingSenderId: "914312176526",
  appId: "1:914312176526:web:26026bbe9b07c7522e3adf",
  measurementId: "G-910B39C8MZ"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function App() {
  navigator.serviceWorker.register("/sw.js").then(registration => {
    getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: 'BKI6Qrxv4br-LHjMG5M2fxksmjBAPfyafkiNWJZ2gl_l66QW-jK8QX7TFnfPBvpSuQp1nyDlTyaSxUk8hagRiQ4'
    }).then((currentToken) => {
      if (currentToken) {
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
      // ...
    });

    const channel = new BroadcastChannel("notifications");
    channel.addEventListener("message", (event) => {
      console.log("Receive background: ", event.data);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
