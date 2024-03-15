// Get the image container
const imageContainer = document.querySelector(".card2images");

// Event listener for clicking on an image
imageContainer.addEventListener("click", function (e) {
    // Get the clicked image
    const clickedImage = e.target;
    
    // Calculate the new scroll position based on the clicked image's position
    const newScrollLeft = clickedImage.offsetLeft - imageContainer.offsetLeft;
    
    // Scroll to the new position
    imageContainer.scrollLeft = newScrollLeft;
});

// Event listener for clicking on the container to scroll back to the previous image
imageContainer.addEventListener("click", function (e) {
    const clickedImage = e.target;
    const newScrollLeft = clickedImage.offsetLeft - imageContainer.offsetLeft;
    if (newScrollLeft === imageContainer.scrollLeft) {
        const previousImage = clickedImage.previousElementSibling;
        if (previousImage) {
            const previousScrollLeft = previousImage.offsetLeft - imageContainer.offsetLeft;
            imageContainer.scrollLeft = previousScrollLeft;
        }
    }
});
