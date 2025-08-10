document.addEventListener("DOMContentLoaded", () => {
  const closeButtons = document.querySelectorAll(".close-icon");
  const closeSound = document.getElementById("closeSound");

  function playCloseSound() {
    if (closeSound) {
      closeSound.currentTime = 0;
      closeSound.play().catch((e) => console.log("Не удалось воспроизвести звук:", e));
    }
  }

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      playCloseSound();

      setTimeout(() => {
        window.history.back();
      }, 250);
    });
  });
});
