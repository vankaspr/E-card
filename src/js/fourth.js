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

// TODO: ПРИ НАЖАТИИ НА КНОПКУ ХОЧУ ФЕЕРВЕРК И ФАНФАРЫ

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.pictures-on-choice');
    const leftArrow = document.querySelector('.left-icon');
    const rightArrow = document.querySelector('.right-icon');
    const slideSound = document.getElementById("LRSound");
    let currentSlide = 0;

    // Показываем первый слайд
    slides[currentSlide].classList.add('active');

    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));

        // Корректируем индекс если вышли за границы
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;

        // Показываем текущий слайд
        slides[currentSlide].classList.add('active');
    }

    // Функция для воспроизведения звука
    function playSound() {
        slideSound.currentTime = 0; // Перематываем на начало (если звук уже играл)
        slideSound.play().catch(e => console.log("Звук не воспроизведён:", e)); // На случай ошибок
    }

    leftArrow.addEventListener('click', function() {
        currentSlide--;
        showSlide(currentSlide);
        playSound();
    });

    rightArrow.addEventListener('click', function() {
        currentSlide++;
        showSlide(currentSlide);
        playSound();
    });

    // Навигация клавиатурой
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            currentSlide--;
            showSlide(currentSlide);
            playSound();
        } else if (e.key === 'ArrowRight') {
            currentSlide++;
            showSlide(currentSlide);
            playSound();
        }
    });
});