document.addEventListener("DOMContentLoaded", () => {
  const thirdPageBtn = document.querySelector(".third-button");
  const clickSound = document.getElementById("clickSound");

  thirdPageBtn.addEventListener("click", async () => {
    clickSound.currentTime = 0;
    clickSound.play().catch((e) => console.error("Ошибка звука:", e));

    // Переход после начала воспроизведения
    setTimeout(() => window.electronAPI.navigateTo("fourth"), 300);
  });
});
