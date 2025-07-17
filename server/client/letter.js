// letter.js

// ===== Firebase Setup =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// ===== Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyCoXSaBmOTodQNYkWpiKBGU2t-ZuIEenzw",
  authDomain: "restaurant-31675.firebaseapp.com",
  databaseURL: "https://restaurant-31675-default-rtdb.firebaseio.com",
  projectId: "restaurant-31675",
  storageBucket: "restaurant-31675.appspot.com",
  messagingSenderId: "341352125854",
  appId: "1:341352125854:web:1cd1829f8349b5b42bb28f",
  measurementId: "G-Y1K2L8DCEP"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('newsletter-email');
            const email = emailInput.value.trim();

            if (!email) {
                Swal.fire('Error', 'Please enter a valid email.', 'error');
                return;
            }

            const timestamp = new Date().toISOString();
            const newsletterData = { email, timestamp };

            // Save under 'sub-form' node in Firebase
            const newslettersRef = ref(db, 'sub-form');

            push(newslettersRef, newsletterData)
                .then(() => {
                    emailInput.value = '';
                    Swal.fire('Subscribed!', 'Thank you for subscribing to our newsletter.', 'success');
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire('Error', 'Could not subscribe. Please try again.', 'error');
                });
        });
    }
});
// Hide loader overlay when the page is fully loaded
// ✅ Ensure this runs after all content is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) loaderOverlay.style.display = 'none';
  });
});