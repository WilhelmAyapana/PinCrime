import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB5AWgEqw8cpp7XibuKt6PYOENxQcrmIQA",
    authDomain: "loginsignup-e35d7.firebaseapp.com",
    projectId: "loginsignup-e35d7",
    storageBucket: "loginsignup-e35d7.firebasestorage.app",
    messagingSenderId: "373239397832",
    appId: "1:373239397832:web:0941172f776a9303f654fd"
};
function showPopupMessageError(message, isSuccess) {
    const popup = isSuccess ? document.getElementById("popup-success") : document.getElementById("popup-error");
    const popupMessage = isSuccess ? document.getElementById("popup-message-success") : document.getElementById("popup-message-error");
    const popupClose = isSuccess ? document.getElementById("popup-close-success") : document.getElementById("popup-close-error");

    // Set the message text
    message = message.replace(/\n/g, '<br>');
    message = "<span class='popup-bold-center'>Failed!</span>" + message;
    popupMessage.innerHTML = message;

    // Show the popup
    popup.classList.add("visible");
    popup.classList.remove("hidden");

    // Add event listener to close button
    popupClose.addEventListener("click", () => {
        popup.classList.add("hidden");
        popup.classList.remove("visible");
    });

    // Auto-hide the popup after 5 seconds
    setTimeout(() => {
        popup.classList.add("hidden");
        popup.classList.remove("visible");
    }, 2000);
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const submit = document.getElementById('submit');
const verificationMessage = document.getElementById('verificationMessage');  // Target the message element
verificationMessage.style.display = 'none'; // Hide it initially

submit.addEventListener("click", function (event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (user.emailVerified) {
                // User's email is verified, proceed with login
                window.location.href = "index.html"; // Redirect to your app's dashboard or home page
            } else {
                // User's email is not verified
                showPopupMessageError("Please verify your email before logging in.");  // Show the message
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showPopupMessageError("Invalid Credentials Please Try Again");  // Handle other errors like wrong password or email not found
        });
});
