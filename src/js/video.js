document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll(".video-compilation");
  const leftArrow = document.querySelector(".left-icon");
  const rightArrow = document.querySelector(".right-icon");
  const slideSound = document.getElementById("LRSound");

  let currentIndex = 0;

  // Скрыть все видео кроме первого
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
    // Корректировка индекса
    if (index < 0) index = videos.length - 1;
    if (index >= videos.length) index = 0;

    // Остановить текущее
    videos[currentIndex].pause();
    videos[currentIndex].currentTime = 0;
    videos[currentIndex].style.display = "none";

    // Показать и запустить новое
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

  // Навигация стрелками с клавиатуры
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      showVideo(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
      showVideo(currentIndex + 1);
    }
  });
});
