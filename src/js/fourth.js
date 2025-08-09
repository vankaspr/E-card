document.addEventListener('DOMContentLoaded', () => {
    const getBtn= document.querySelector(".get-button")
    const clickSound = document.getElementById('clickSound');

    getBtn.addEventListener('click', async () => {

        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.error("Ошибка звука:", e));

        // Переход после начала воспроизведения
        //setTimeout(() => window.electronAPI.navigateTo('fourth'), 300);
    });
});