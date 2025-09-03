import logo from './logo.svg';
import './App.css';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

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
