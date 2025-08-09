document.addEventListener('DOMContentLoaded', () => {
    const getBtn= document.querySelector(".get-button")
    const clickSound = document.getElementById('clickSound');

    // Цвета для конфетти
    const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#ff8c00'];

    getBtn.addEventListener('click', async () => {

        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.error("Ошибка звука:", e));

        // Создаем 50 частиц конфетти
        for (let i = 0; i < 300; i++) {
            setTimeout(() => createConfetti(), i * 5);
        }
    });

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Случайный цвет
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Начальная позиция (центр кнопки)
        const rect = getBtn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;

        document.body.appendChild(confetti);

        // Анимация полета
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 5;
        const rotation = Math.random() * 100;

        let posX = x;
        let posY = y;
        let frame = 0;

        const animate = () => {
            frame++;

            // Движение с учетом гравитации
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity + frame * 0.1;

            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.transform = `rotate(${rotation + frame * 5}deg)`;

            // Удаляем через 3 секунды
            if (frame < 100) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };

        requestAnimationFrame(animate);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.pictures-on-choice');
    const slideButtons = document.querySelectorAll('.slider-container button');
    const leftArrow = document.querySelector('.left-icon');
    const rightArrow = document.querySelector('.right-icon');
    const slideSound = document.getElementById("LRSound");
    let currentSlide = 0;

    // Показываем первый слайд
    slides[currentSlide].classList.add('active');

    function showSlide(index) {
        // Корректируем индекс, если ушли за границы
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // Обновляем текущий слайд
        currentSlide = index;

        // Скрываем все слайды и показываем текущий
        slides.forEach(slide => slide.classList.remove('active'));
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

    // 2. Обработчики для кликов по слайдам (навигация)
    slideButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Показываем слайд, на который кликнули
            showSlide(index);
            playSound();

            // Соответствие слайдов и страниц
            const pages = ['sunshine', 'money', 'playlist', 'video', 'cake'];
            const targetPage = pages[index];

            // Переход через 300мс (после звука)
            setTimeout(() => {
                window.electronAPI.navigateTo(targetPage);
            }, 300);
        });
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