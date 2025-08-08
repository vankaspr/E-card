const button = document.querySelector('.start-button');
const clickSound = document.getElementById('clickSound');

button.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
})