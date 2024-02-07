// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDVngHvDUi9VwGAA5hcRa0qvCSQxAXp7Z0",
    authDomain: "authentication-chatu.firebaseapp.com",
    projectId: "authentication-chatu",
    storageBucket: "authentication-chatu.appspot.com",
    messagingSenderId: "286917966905",
    appId: "1:286917966905:web:a8051b476bd9f22fc861e8"
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const database = getDatabase(app);

let loginButton = document.getElementById("Login");

// ... (your existing code)

loginButton.addEventListener('click', (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      // Capture username and email from user input (replace with your actual logic)
      const username = "user123";
      const email = "user@example.com";

      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email
      })
      .then(() => {
        alert(`Successful login! Welcome, ${user.displayName}!`);
        // Store user information in the Realtime Database
        storeUserInfo(user.uid, user.displayName, user.photoURL, user.email);

        console.log("Redirecting to main page...");
        setTimeout(() => {
          window.location.href = `mainPage.html?uid=${user.uid}`;
        }, 2000);
      })
      .catch((error) => {
        console.error("Error storing data in the Realtime Database:", error);
      });

    })
    .catch((error) => {
      console.error("Error signing in with Google:", error);
    });
});

// Define the storeUserInfo function to store user information in the Realtime Database
function storeUserInfo(uid, displayName, photoURL, email) {
  const joindate = new Date(); // Creates a new Date object representing the current date and time
  const userRef = ref(database, 'users/' + uid); // Reference to the user's data in the database

  // Set user data in the database
  return set(userRef, {
    displayName: displayName,
    photoURL: photoURL,
    email: email,
    joindate: joindate.toISOString() // Store joindate as a string in ISO format
  })
  .then(() => {
    console.log("User information stored successfully.");
  })
  .catch((error) => {
    console.error("Error storing user information:", error);
  });
};
