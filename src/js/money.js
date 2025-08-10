const memes = [
    "meme1.jpg",
    "meme2.jpg",
    "meme3.jpg",
    "meme4.jpg",
    "meme5.jpg",
    "meme6.jpg",
    "meme7.jpg",
    "meme8.jpg",
    "meme9.jpg",
    "meme10.jpg",
    "meme11.jpg",
    "meme12.jpg",
]

// Звук для мема
const memeSound = new Audio("../../media/sounds/mmm-bitch.mp3");
memeSound.playbackRate = 1.8; // ускоряем звук

const audio = document.getElementById("meme-audio");
const memeContainer = document.getElementById("meme-container");

let memeList = [...memes];

function showRandomMeme() {
    if (memeList.length === 0) return;

    const index = Math.floor(Math.random() * memeList.length);
    const memeSrc = memeList.splice(index, 1)[0];

    const img = document.createElement("img");
    img.src = "../../media/images/" + memeSrc;
    img.className = "meme";

    memeContainer.innerHTML = ""; // очистка предыдущего
    memeContainer.appendChild(img);

    requestAnimationFrame(() => {
        img.classList.add("show"); // триггер резкого появления
        memeSound.currentTime = 0; // на всякий случай перематываем
        memeSound.play(); // запускаем звук мема
    });

    // Через 2 секунды исчезает
    setTimeout(() => {
        img.classList.remove("show");
    }, 1000);
}

audio.addEventListener("play", () => {
    memeList = [...memes];
    let interval = setInterval(() => {
        if (audio.paused || audio.ended) {
            clearInterval(interval);
        } else {
            showRandomMeme();
        }
    }, 9000); // каждые 9 секунд (1:50 / 12 мемов ≈ 9 сек)
});