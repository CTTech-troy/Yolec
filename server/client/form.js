document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent page reload

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const consent = document.getElementById('consent').checked;

        console.log({
            name,
            email,
            subject,
            message,
            consent
        });
    });
});
// Hide loader overlay when the page is fully loaded
// ✅ Ensure this runs after all content is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const loaderOverlay = document.getElementById('loader-overlay');
    if (loaderOverlay) loaderOverlay.style.display = 'none';
  });
});