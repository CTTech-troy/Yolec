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
