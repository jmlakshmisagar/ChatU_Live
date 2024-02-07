// Import statements
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

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const database = getDatabase();

// Function to fetch user data using UID
    async function fetchUserData(uid) {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    return snapshot.val();
}

// Function to update user interface with user data
async function updateUserInterface() {
try {
// Get the UID1 parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const uid1 = urlParams.get('uid1');

// Fetch user data for UID1
const userData = await fetchUserData(uid1);

// Update UI with user data
if (userData) {
document.getElementById('name').textContent = userData.displayName;
document.getElementById('email').textContent = userData.email;
document.getElementById('joindate').textContent = formatDate(userData.joindate); // Call formatDate function
        // Check if photoURL exists and update the image source
        if (userData.photoURL) {
        document.getElementById('profilePic').src = userData.photoURL;
        } else {
        console.log('Photo URL not found for user:', uid1);
            }
            } else {
            console.log('User data not found for user:', uid1);
            }
            } catch (error) {
            console.error('Error updating user interface:', error);
            }
            }

        // Function to format date
            function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString(); // Customize date formatting as needed
        }


// Call the function to update the user interface
updateUserInterface();
