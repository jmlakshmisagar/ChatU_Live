// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVngHvDUi9VwGAA5hcRa0qvCSQxAXp7Z0",
    authDomain: "authentication-chatu.firebaseapp.com",
    projectId: "authentication-chatu",
    storageBucket: "authentication-chatu.appspot.com",
    messagingSenderId: "286917966905",
    appId: "1:286917966905:web:a8051b476bd9f22fc861e8"
};
alert("Please select a user to initiate a conversation.");

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();
// Function to fetch and display users
function fetchAndDisplayUsers() {
    // Reference to the 'users' node in your database
    const usersRef = ref(database, 'users');

    // Fetch data from the 'users' node
    get(usersRef).then((snapshot) => {
        if (snapshot.exists()) {
            // Clear existing user container content
            const userContainer = document.getElementById('Users');
            userContainer.innerHTML = '';

            // Extract the existing UID (uid) from the URL
            const urlParams = new URLSearchParams(window.location.search);
            const uidOpposite = urlParams.get('uid');

            // Iterate through each user
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                const uid = childSnapshot.key; // Get the user UID
                const displayName = userData.displayName;
                const photoURL = userData.photoURL;

                // Create HTML elements to display user information
                const userElement = document.createElement('div');
                userElement.classList.add('user');

                const userImage = document.createElement('img');
                userImage.src = photoURL;
                userImage.alt = displayName;

                const userName = document.createElement('p');
                userName.textContent = displayName;

                // Add click event listener to each user element
                userElement.addEventListener('click', () => {
                    // Construct the new URL for "call.html" with both UIDs
                    const newUrl = `chat.html?uid1=${uidOpposite}&uid=${uid}`;
                    // Redirect to the new URL
                    window.location.href = newUrl;
                });

                // Append user image and username to user container
                userElement.appendChild(userImage);
                userElement.appendChild(userName);

                // Append user element to the user container
                userContainer.appendChild(userElement);
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error('Error fetching users:', error);
    });
}

// Call the function to fetch and display users
fetchAndDisplayUsers();
