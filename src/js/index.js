document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".start-button");
  const clickSound = document.getElementById("clickSound");

  startButton.addEventListener("click", async () => {
    clickSound.currentTime = 0;
    clickSound.play().catch((e) => console.error("Ошибка звука:", e));

    // Переход после начала воспроизведения
    setTimeout(() => window.electronAPI.navigateTo("second"), 300);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");

  bgMusic.volume = 0.3;
  let isPlaying = false;

  // Показываем кнопку Play по умолчанию
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";

  pauseBtn.addEventListener("click", () => {
    bgMusic.pause();
    isPlaying = false;
    toggleButtons();
  });

  playBtn.addEventListener("click", () => {
    // Воспроизводим только при явном нажатии на Play
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        toggleButtons();
      })
      .catch((e) => console.log("Playback failed:", e));
  });

  function toggleButtons() {
    if (isPlaying) {
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
      pauseBtn.classList.add("fade-anim");
      setTimeout(() => pauseBtn.classList.remove("fade-anim"), 300);
    } else {
      pauseBtn.style.display = "none";
      playBtn.style.display = "block";
      playBtn.classList.add("fade-anim");
      setTimeout(() => playBtn.classList.remove("fade-anim"), 300);
    }
  }
});
