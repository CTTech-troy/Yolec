import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// ✅ Firebase config
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ✅ Helper to ensure Base64 prefix if missing
function ensureBase64Prefix(imageString) {
    if (!imageString || imageString.trim() === "") {
        return "./server/client/images/default.jpg";
    }
    return imageString.startsWith("data:image")
        ? imageString
        : "data:image/jpeg;base64," + imageString;
}

// ✅ Reference 'modelImages'
const modelImagesRef = ref(db, 'modelImages');

// ✅ Select the container for event cards
const container = document.getElementById('event-cards-container');

// ✅ Listen for published data and render
onValue(modelImagesRef, (snapshot) => {
    container.innerHTML = '';

    if (snapshot.exists()) {
        const data = snapshot.val();
        let publishedCount = 0;

        Object.keys(data).forEach((key) => {
            const item = data[key];

            if (item.status && item.status.toLowerCase() === "published") {
                publishedCount++;

                const imgSrc = ensureBase64Prefix(item.url);
                const tag = item.type || "Event";
                const date = item.uploadDate || "TBD";
                const title = item.title || "Untitled Event";
                const description = item.description || "No description available.";

                // ✅ Build card HTML
                const card = document.createElement('div');
                card.className = "event-card bg-white rounded-lg shadow-lg overflow-hidden";

                card.innerHTML = `
                    <div class="relative h-60">
                        <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover">
                        <div class="absolute top-4 right-4 bg-primary text-white text-sm font-semibold py-1 px-3 rounded">${tag}</div>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center text-gray-500 text-sm mb-2">
                            <div class="w-4 h-4 flex items-center justify-center mr-2">
                                <i class="ri-calendar-line"></i>
                            </div>
                            <span>${date}</span>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3">${title}</h3>
                        <p class="text-gray-700 mb-4">${description}</p>
                    </div>
                `;

                container.appendChild(card);
                console.log(`✅ Displayed published event: ${title}`);
            } else {
                console.log(`⛔ Skipped ${key} (not published)`);
            }
        });

        if (publishedCount === 0) {
            console.log("ℹ️ No published items to display from 'modelImages'.");
        }

    } else {
        console.log("ℹ️ No data available in 'modelImages'.");
    }
}, (error) => {
    console.error("❌ Error fetching data from 'modelImages':", error);
});
// Hide loader overlay when the page is fully loaded
// ✅ Ensure this runs after all content is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) loaderOverlay.style.display = 'none';
  });
});