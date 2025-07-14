// ===== Firebase Setup =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

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

// ===== Modal Logic =====
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
let imageInterval = null;
let currentImageIndex = 0;
let publishedImages = [];

function showImageModal() {
  modal.classList.add("active");
}

function closeImageModal() {
  modal.classList.remove("active");
  if (imageInterval) {
    clearInterval(imageInterval);
    imageInterval = null;
  }
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeImageModal();
});

// Close modal on close button
document.querySelector('#imageModal .close-btn').addEventListener('click', closeImageModal);

// ===== Show Default Image Immediately =====
window.addEventListener('load', () => {
  try {
    // Show default image immediately while loading Firebase
    modalImage.src = "./server/client/images/model3.jpg";
    modalImage.alt = "Welcome image";
    showImageModal();

    // Fetch published blog images from Firebase
    const blogsRef = ref(db, 'blogs');
    onValue(blogsRef, (snapshot) => {
      try {
        const blogs = snapshot.val();
        publishedImages = [];

        if (blogs) {
          Object.values(blogs).forEach(blog => {
            if (blog.published === true && blog.image) {
              // Ensure Base64 prefix if missing
              if (!blog.image.startsWith("data:image")) {
                const safeImage = `data:image/jpeg;base64,${blog.image}`;
                publishedImages.push(safeImage);
              } else {
                publishedImages.push(blog.image);
              }
            }
          });
        }

        if (publishedImages.length === 0) {
          console.warn("⚠️ No published images found in Firebase blogs. Check that 'published' is true and 'image' exists for each blog.");
          console.log("Snapshot data received:", blogs);
          return; // Keep default image
        }

        // Replace with first published image
        currentImageIndex = 0;
        displayImage(publishedImages[currentImageIndex]);

        // Cycle through images if multiple
        if (publishedImages.length > 1) {
          if (imageInterval) clearInterval(imageInterval);
          imageInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % publishedImages.length;
            displayImage(publishedImages[currentImageIndex]);
          }, 5000); // Change every 5s
        } else {
          if (imageInterval) {
            clearInterval(imageInterval);
            imageInterval = null;
          }
        }

        console.log(`✅ Firebase images loaded. Cycling ${publishedImages.length} image(s).`);
      } catch (error) {
        console.error("❌ Error processing Firebase snapshot:", error);
      }
    }, (error) => {
      console.error("❌ Firebase onValue error:", error);
    });

  } catch (error) {
    console.error("❌ Error initializing Firebase or fetching images:", error);
  }
});

// ===== Display Image Helper with Fallback =====
function displayImage(src) {
  modalImage.onerror = () => {
    console.error(`❌ Failed to load image: ${src.slice(0, 50)}... Reverting to default.`);
    modalImage.src = "./server/client/images/model3.jpg";
  };
  modalImage.src = src;
  modalImage.alt = "Published blog image";
}
