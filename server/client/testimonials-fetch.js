import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

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

        // Initialize Firebase (modular)
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const testimonialsRef = ref(db, 'testimonials');
        const testimonialsContainer = document.querySelector('#testimonialsGrid');
        const dbStatusElement = document.querySelector('#dbStatus');
        const refreshBtn = document.querySelector('#refreshBtn');
        const viewSourceBtn = document.querySelector('#viewSourceBtn');


        // Log all testimonial data from the DB
        onValue(testimonialsRef, (snapshot) => {
            const data = snapshot.val();
            testimonialsContainer.innerHTML = ""; // Clear previous testimonials
            if (!data) {
                console.log("No testimonials found.");
                return;
            }
            // Filter and log only published testimonials
            const publishedTestimonials = Object.values(data).filter(t => t.published === true);
            console.log("Published testimonials from DB:", publishedTestimonials);

            publishedTestimonials.forEach(t => {
                const avatarUrl = getAvatarImgUrl(t.name || "");
                const testimonialHtml = `
                    <div class="testimonial-card bg-white p-8 rounded-lg shadow-lg mb-6">
    <div class="flex items-center mb-6">
        <img src="${avatarUrl}" alt="${t.name} Avatar" class="w-16 h-16 rounded-full object-cover mr-4">
        <div>
            <h4 class="font-semibold text-gray-900">${t.name}</h4>
            <p class="text-gray-600 text-sm">${t.company || ""}</p>
        </div>
    </div>
    <div class="mb-4 text-yellow-400 flex">
        ${generateStars(t.rating || 5)}
    </div>
    <p class="text-gray-700 italic">"${t.testimonial || t.message || ""}"</p>
</div>

                `;
                testimonialsContainer.innerHTML += testimonialHtml;
            });
        });

        // Helper: Generate avatar image URL using ui-avatars.com
        function getAvatarImgUrl(name) {
            const initial = name && name.length > 0 ? name[0].toUpperCase() : "?";
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=random&color=fff&size=64`;
        }
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="ri-star-fill"></i>';
    }
    if (halfStar) {
        starsHtml += '<i class="ri-star-half-fill"></i>';
    }
    return starsHtml;
}
// Hide loader overlay when the page is fully loaded
// ✅ Ensure this runs after all content is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) loaderOverlay.style.display = 'none';
  });
});