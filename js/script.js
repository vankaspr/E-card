const button = document.querySelector('.start-button');
const clickSound = document.getElementById('clickSound');

button.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
})


document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3;

    const playMusic = () => {
        bgMusic.play().catch(e => console.log("Auto play NOT PERMISSION"));
    };

    playMusic();

    //document.body.addEventListener('click', () => {
    //    playMusic();
    //    document.body.removeEventListener('click', playMusic);
    //}, { once: true});
})