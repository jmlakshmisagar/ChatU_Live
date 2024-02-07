import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, get, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const database = getDatabase(); // Use getDatabase instead of firebase.database

// Function to extract query parameters from URL
function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);
    return {
        uid1: searchParams.get('uid1'),
        uid: searchParams.get('uid')
    };
}

// Function to update user interface with user data
async function updateUserInterface() {
    // Get the UID parameters from the URL
    const { uid1, uid } = getUrlParams();

    // Fetch user data for sender (uid1)
    const senderUserData = await fetchUserData(uid1);
    // Update sender UI elements with senderUserData
    document.getElementById('senderImg').src = senderUserData.photoURL;
    document.getElementById('senderName').textContent = senderUserData.displayName;

    // Fetch user data for receiver (uid)
    const receiverUserData = await fetchUserData(uid);
    // Update receiver UI elements with receiverUserData
    document.getElementById('receiverImg').src = receiverUserData.photoURL;
    document.getElementById('receiverName').textContent = receiverUserData.displayName;
}

// Call the function to update the user interface
updateUserInterface();

// Function to fetch user data using UID
async function fetchUserData(uid) {
    const userRef = ref(database, 'users/' + uid); // Use ref from getDatabase
    const snapshot = await get(userRef); // Use get method to retrieve data
    return snapshot.val();
}

// JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const sendMessageButton = document.querySelector('.input button');
    const messageInput = document.querySelector('.input input');
    const livechat = document.querySelector('.livechat');
    const receiverChats = document.querySelector('.receiver .chats');

    sendMessageButton.addEventListener('click', sendMessage);

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            const { uid1, uid } = getUrlParams(); // Get UID parameters from URL
    
            // Generate a unique ID for the chat
            const chatId = generateChatId(uid1, uid);
    
            // Create a reference to the chat
            const chatRef = ref(database, `chats/${chatId}`);
    
            // Push message to the chat
            const newMessageRef = push(chatRef);
            await set(newMessageRef, {
                senderUid: uid1,
                receiverUid: uid,
                message: message
            });
    
            // Create message element for sender and append it to livechat
            const senderMessageElement = createMessageElement(message, 'sender');
            livechat.appendChild(senderMessageElement);
    
            // Also append message to receiver's chat area
            const receiverMessageElement = createMessageElement(message, 'receiver');
            receiverChats.appendChild(receiverMessageElement);
    
            // Clear input after sending message
            messageInput.value = '';
        }
    }
    

    // Function to generate a unique chat ID
    function generateChatId(uid1, uid2) {
        const uids = [uid1, uid2].sort();
        return uids[0] + '-' + uids[1];
    }

    function createMessageElement(message, senderType) {
        const messageElement = document.createElement("p");
        messageElement.classList.add('message', senderType);
        messageElement.textContent = message;
        
        // Add inline style to the message element
        messageElement.style.color = "black";
        messageElement.style.margin = "12px 15px";
        messageElement.style.padding = "10px";
        messageElement.style.backgroundColor = "grey";
        messageElement.style.width = "fit-content";
        messageElement.style.borderRadius = "10px";
    
        return messageElement;
    }
    
});



// Function to search for messages where receiverUid matches user's uid and display them
// Function to search for messages where receiverUid matches user's uid and display them
async function displayReceiverMessages(uid1) {
    const chatRef = ref(database, 'chats');
    const snapshot = await get(chatRef);

    snapshot.forEach((childSnapshot) => {
        const chatData = childSnapshot.val();
        if (chatData.receiverUid === uid1) {
            const message = chatData.message;
            const messageElement = createMessageElement(message, 'receiver');
            const oppchattingsElement = document.getElementById('oppchattings');
            oppchattingsElement.appendChild(messageElement);
        }
    });
}

// Get uid1 from the URL query parameters
const { uid1 } = getUrlParams();

// Call the function to display receiver messages
displayReceiverMessages(uid1);







// Function to get the value of uid1 from the URL query parameters
function getUid1FromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('uid1');
}

// Function to construct the profile.html URL with uid1 parameter
function constructProfileUrl(uid1) {
    return `profile.html?uid1=${uid1}`;
}

// Add click event listener to the profile button
document.getElementById('profileLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    const uid1 = getUid1FromUrl(); // Get uid1 from the URL
    if (uid1) {
        const profileUrl = constructProfileUrl(uid1); // Construct the profile.html URL with uid1 parameter
        window.location.href = profileUrl; // Redirect to the profile.html page
    } else {
        console.error('UID1 parameter not found in the URL');
    }
});





// JavaScript
document.getElementById('call').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    const urlParams = new URLSearchParams(window.location.search);
    const uid1 = urlParams.get('uid1');
    const uid = urlParams.get('uid');

    // Redirect to call.html with uid1 and uid parameters
    window.location.href = `call.html?uid1=${uid1}&uid=${uid}`;
});



// JavaScript
document.getElementById('lobby').addEventListener('click', function() {
    // Alert the user to login again
    alert("Please login again to start a new chat.");

    // Redirect to the login page
    window.location.href = "login.html";
});
