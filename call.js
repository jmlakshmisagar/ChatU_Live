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
const database = getDatabase(); // Use getDatabase instead of firebase.database
// JavaScript
alert("Initializing call. Please wait...");

// Function to extract query parameters from URL
function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);
    return {
        uid1: searchParams.get('uid1'),
        uid: searchParams.get('uid')
    };
}

// Function to fetch user data using UID
async function fetchUserData(uid) {
    const userRef = ref(database, 'users/' + uid); // Use ref from getDatabase
    const snapshot = await get(userRef); // Use get method to retrieve data
    return snapshot.val();
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


// JavaScript
// JavaScript
document.getElementById('lobby').addEventListener('click', function() {
    // Alert the user to login again
    alert("Please login again to start a new chat.");

    // Redirect to the login page after the alert is closed
    window.location.href = "login.html";
});

// ------------------------------------------------------------------------------------------//



// Get the local video stream and display it in the local video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = stream;
    })
    .catch(error => {
        console.error('Error accessing local media devices:', error);
    });

// Function to set the remote video stream to the remote video element
function setRemoteVideo(stream) {
    const remoteVideo = document.getElementById('remoteVideo');
    remoteVideo.srcObject = stream;
}

// Example signaling and connection establishment code (replace with your actual signaling code)
const signalingServerUrl = 'authentication-chatu.firebaseapp.com'; // Replace with your signaling server URL

const signalingSocket = new WebSocket(signalingServerUrl);

signalingSocket.onopen = () => {
    console.log('Connected to signaling server');
    // Send signaling message to establish connection
};

signalingSocket.onmessage = event => {
    const message = JSON.parse(event.data);
    // Handle signaling messages (e.g., offer, answer, ice candidates)
    // Example:
    if (message.type === 'offer') {
        // Handle offer message from remote peer
        // Create peer connection and set remote description
    } else if (message.type === 'candidate') {
        // Handle ICE candidate message from remote peer
        // Add ICE candidate to peer connection
    }
};

// Example code for establishing a peer connection (replace with your actual implementation)
function establishPeerConnection() {
    const configuration = { iceServers: [{ urls: 'authentication-chatu.firebaseapp.com' }] }; // Replace with your ICE server configuration

    const peerConnection = new RTCPeerConnection(configuration);

    // Add local video stream to peer connection
    const localVideoStream = document.getElementById('localVideo').srcObject;
    localVideoStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localVideoStream);
    });

    // Handle incoming remote stream
    peerConnection.ontrack = event => {
        setRemoteVideo(event.streams[0]);
    };

    // Example code for handling ICE candidates (replace with your actual implementation)
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            // Send ICE candidate to remote peer via signaling server
            signalingSocket.send(JSON.stringify({
                type: 'candidate',
                candidate: event.candidate
            }));
        }
    };

    // Create and send offer to remote peer
    peerConnection.createOffer()
        .then(offer => {
            return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
            // Send offer to remote peer via signaling server
            signalingSocket.send(JSON.stringify({
                type: 'offer',
                offer: peerConnection.localDescription
            }));
        })
        .catch(error => {
            console.error('Error creating offer:', error);
        });
}

// Call function to establish peer connection when ready
establishPeerConnection();




















