document.addEventListener("DOMContentLoaded", function () {
  const card2images = document.querySelector(".card2images"); // Selecting the card2images container
  let isMouseDown = false;
  let startX;
  let startScrollLeft;

  card2images.addEventListener("mousedown", (e) => {
    e.preventDefault(); // Prevent default behavior (such as image copying)
    isMouseDown = true;
    startX = e.pageX;
    startScrollLeft = card2images.scrollLeft;
  });

  document.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  card2images.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
      e.preventDefault(); // Prevent default behavior (such as image copying)
      const distance = e.pageX - startX;
      card2images.scrollLeft = startScrollLeft - distance;
    }
  });
});
