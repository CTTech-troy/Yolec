// FULL Firebase + Contact + Testimonial unified script

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

// Make Firebase functions available globally for other scripts if needed
window.db = db;
window.ref = ref;
window.push = push;

// ===== When DOM Ready =====
document.addEventListener('DOMContentLoaded', function () {

 // ============================
// ======= CONTACT FORM =======
// ============================

// Ensure Firebase is initialized elsewhere in your project
// Example:
// import { getDatabase, ref, push } from "firebase/database";
// const db = getDatabase();

const contactForm = document.querySelector('#contact form');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked; // ✅ capture consent checkbox state

    const contactData = {
      name,
      email,
      subject,
      message,
      consent, // ✅ store consent in DB
      timestamp: Date.now() // ✅ store milliseconds for easy sorting
    };

    console.log("Contact form data to save:", contactData);

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const contactRef = ref(db, 'contactsin'); // ✅ correct collection
      await push(contactRef, contactData); // ✅ push data including consent & timestamp

      if (typeof Swal !== 'undefined') {
        await Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully.',
        });
      } else {
        alert("Your message has been sent successfully.");
      }

      contactForm.reset();
    } catch (error) {
      console.error("Error saving contact:", error);
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was a problem sending your message.',
        });
      } else {
        alert("There was a problem sending your message.");
      }
    } finally {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });
}

  // ============================
  // ===== TESTIMONIAL MODAL ====
  // ============================

  const testimonialModal = document.getElementById('testimonial-modal');
  const openTestimonialModal = document.getElementById('open-testimonial-modal');
  const closeTestimonialModal = document.getElementById('close-testimonial-modal');
  const cancelTestimonial = document.getElementById('cancel-testimonial');
  const testimonialForm = testimonialModal ? testimonialModal.querySelector('form') : null;
  const stars = testimonialModal ? testimonialModal.querySelectorAll('.star') : [];

  if (testimonialModal && openTestimonialModal && closeTestimonialModal && cancelTestimonial && testimonialForm) {

    let currentRating = 0;

    const highlightStars = (rating) => {
      stars.forEach(star => {
        const starRating = parseInt(star.getAttribute('data-rating'));
        if (starRating <= rating) {
          star.classList.add('text-yellow-400');
          star.classList.remove('text-gray-300');
        } else {
          star.classList.add('text-gray-300');
          star.classList.remove('text-yellow-400');
        }
      });
    };

    stars.forEach(star => {
      star.addEventListener('mouseover', () => highlightStars(parseInt(star.getAttribute('data-rating'))));
      star.addEventListener('mouseout', () => highlightStars(currentRating));
      star.addEventListener('click', () => {
        currentRating = parseInt(star.getAttribute('data-rating'));
        highlightStars(currentRating);
      });
    });

    const openModal = () => testimonialModal.classList.add('active');
    const closeModal = () => testimonialModal.classList.remove('active');

    openTestimonialModal.addEventListener('click', openModal);
    closeTestimonialModal.addEventListener('click', closeModal);
    cancelTestimonial.addEventListener('click', closeModal);

    testimonialModal.addEventListener('click', (e) => {
      if (e.target === testimonialModal) closeModal();
    });

    testimonialForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById("modal-name")?.value.trim() || "";
      const company = document.getElementById("modal-company")?.value.trim() || "";
      const eventAttended = document.getElementById("modal-event")?.value.trim() || "";
      const testimonial = document.getElementById("modal-testimonial")?.value.trim() || "";
      const consent = document.getElementById("modal-consent")?.checked || false;
      const published = document.getElementById("modal-published")?.checked || false;

      if (!name || !testimonial) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'warning',
            title: 'Missing Fields',
            text: 'Please fill in your name and testimonial.',
          });
        } else {
          alert("Please fill in your name and testimonial.");
        }
        return;
      }

      const testimonialData = {
        name,
        company,
        eventAttended,
        testimonial,
        consent,
        rating: currentRating,
        timestamp: new Date().toISOString(),
      };

      console.log("Submitting testimonial:", testimonialData);

      const submitButton = testimonialForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;

      submitButton.textContent = "Submitting...";
      submitButton.disabled = true;

      try {
        const testimonialsRef = ref(db, 'testimonials');
        await push(testimonialsRef, testimonialData);

        if (typeof Swal !== 'undefined') {
          await Swal.fire({
            icon: 'success',
            title: 'Thank you!',
            text: 'Your testimonial has been submitted.',
          });
        } else {
          alert("Your testimonial has been submitted.");
        }

        testimonialForm.reset();
        highlightStars(0);
        currentRating = 0;
        closeModal();

      } catch (error) {
        console.error("Error saving testimonial:", error);
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'There was a problem submitting your testimonial.',
          });
        } else {
          alert("There was a problem submitting your testimonial.");
        }
      } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });

  } else {
    console.warn('Testimonial modal not found or form missing.');
  }

});
