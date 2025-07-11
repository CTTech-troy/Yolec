
// Fixed image modal functions
function showImageModal() {
    document.getElementById("imageModal").classList.add("active");
}

function closeImageModal() {
    document.getElementById("imageModal").classList.remove("active");
    clearInterval(imageInterval); // Stop image shuffle when closed
}

// Close modal when clicking outside content
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

let imageInterval; // Reference for cleanup
window.onload = function () {
    // Show welcome modal after page loads
    setTimeout(showImageModal, 100);

    // Start image shuffle every 1 second
    const images = [
        "./server/client/images/model.jpg",
        "./server/client/images/model2.jpg"
    ];
    let currentIndex = 0;
    const modalImage = document.getElementById('modalImage');

    imageInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex];
    }, 5000);
};
