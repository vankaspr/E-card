const button = document.querySelector('.start-button');
const clickSound = document.getElementById('clickSound');




button.addEventListener('click', () => {
    clickSound.currentTime = 0;
    clickSound.play();
})


document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    bgMusic.volume = 0.3;
    let isPlaying = false;

    pauseBtn.addEventListener('click', () => {
        bgMusic.pause();
        isPlaying = false;
        toggleButtons();
    })

    playBtn.addEventListener('click', () => {
        bgMusic.play();
        isPlaying = true;
        toggleButtons();
    })

    function toggleButtons() {
        if (isPlaying) {
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'block';
            pauseBtn.classList.add('fade-anim');
            setTimeout(() => pauseBtn.classList.remove('fade-anim'), 300);
        } else {
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'block';
            playBtn.classList.add('fade-anim');
            setTimeout(() => playBtn.classList.remove('fade-anim'), 300);
        }
    }

    const playMusic = () => {
        bgMusic.play().catch(e => console.log("Auto play NOT PERMISSION"));
    };

    playMusic();

})