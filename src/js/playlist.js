const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const cover = document.getElementById('cover');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const volumeSlider = document.getElementById('volume');


const playlist = [
    {
        title: "Piano Tiles",
        artist: "Armani West",
        cover: "../../media/images/music6.jpg",
        audio: "../../media/music/armani west-Piano Tiles.mp3"
    },
    {
        title: "Pitbull Terrier",
        artist: "Die Antwoord",
        cover: "../../media/images/music5.jpg",
        audio: "../../media/music/Die Antwoord-Pitbull Terrier.mp3"
    },
    {
        title: "Clima Lindo",
        artist: "GXMZ & Repsaj",
        cover: "../../media/images/music3.jpg",
        audio: "../../media/music/GXMZ, Repsaj-CLIMA LINDO.mp3"
    },
    {
        title: "BloodHunt",
        artist: "Reborn Slowed",
        cover: "../../media/images/music2.jpg",
        audio: "../../media/music/REBORN (Slowed)-BloodHunt.mp3"
    },
    {
        title: "SICK WITH IT",
        artist: "Milli",
        cover: "../../media/images/music8.jpg",
        audio: "../../media/music/MILLI -SICK WITH IT.mp3"
    },
    {
        title: "Little Baby Boy",
        artist: "Velours",
        cover: "../../media/images/music1.jpg",
        audio: "../../media/music/velours-oh my little baby boy (hardbootleg version).mp3"
    },
    {
        title: "the love parade",
        artist: "Vieze Asbak",
        cover: "../../media/images/music7.jpg",
        audio: "../../media/music/Vieze Asbak-meet her at the love parade.mp3"
    },
    {
        title: "兰若度母",
        artist: "福禄寿",
        cover: "../../media/images/music4.jpg",
        audio: "../../media/music/福禄寿-兰若度母.mp3"
    },

];

let currentTrack = 0;

// Загрузка трека с автовоспроизведением
function loadTrack(trackIndex) {
    const track = playlist[trackIndex];
    songTitle.textContent = track.title;
    artist.textContent = track.artist;
    cover.src = track.cover;
    audio.src = track.audio;

    audio.load();
    audio.play().catch(e => console.log("Автовоспроизведение заблокировано, нажми ▶"));

    playBtn.textContent = "⏸";
}

// Следующий трек
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
}

// Предыдущий трек
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
}

// Play/Pause
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Обновление прогресса
function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let mins = Math.floor(currentTime / 60);
    let secs = Math.floor(currentTime % 60);
    if (secs < 10) secs = `0${secs}`;
    currentTimeEl.textContent = `${mins}:${secs}`;
}

// Перемотка
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Громкость
function setVolume() {
    audio.volume = this.value;
}

// События
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack); // Автопереключение в конце трека
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

// Загрузка первого трека с автовоспроизведением
loadTrack(currentTrack);