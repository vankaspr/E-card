document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video-compilation");
  const leftArrow = document.querySelector(".left-icon");
  const rightArrow = document.querySelector(".right-icon");
  const slideSound = document.getElementById("LRSound");

  let currentIndex = 0;

  videos.forEach((video, index) => {
    if (index !== 0) {
      video.style.display = "none";
    } else {
      video.play().catch(() => {});
    }
  });

  function playSound() {
    slideSound.currentTime = 0;
    slideSound.play().catch(() => {});
  }

  function showVideo(index) {
    if (index < 0) index = videos.length - 1;
    if (index >= videos.length) index = 0;

    videos[currentIndex].pause();
    videos[currentIndex].currentTime = 0;
    videos[currentIndex].style.display = "none";

    currentIndex = index;
    videos[currentIndex].style.display = "block";
    videos[currentIndex].play().catch(() => {});

    playSound();
  }

  leftArrow.addEventListener("click", () => {
    showVideo(currentIndex - 1);
  });

  rightArrow.addEventListener("click", () => {
    showVideo(currentIndex + 1);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      showVideo(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      showVideo(currentIndex + 1);
    }
  });
});
