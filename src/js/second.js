document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.querySelector('#typeWriter p');
    const typeSound = document.getElementById('typeSound');
    const originalText = textElement.innerHTML;
    textElement.innerHTML = '';

    const lines = originalText.split('<br>');
    let currentLine = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    let lineDelay = 1000;
    let soundInterval;


    function startSound() {

        typeSound.play().catch(e => console.log("Звук заблокирован"));
        soundInterval = setInterval(() => {

            typeSound.play().catch(e => {});
        }, 200);
    }


    function stopSound() {
        clearInterval(soundInterval);
        typeSound.pause();
    }


    function typeWriter() {
        if (currentLine < lines.length) {
            const currentText = lines[currentLine].trim();

            if (!isDeleting && charIndex <= currentText.length) {

                if (currentLine === 0 && charIndex === 0) {
                    startSound();
                }

                textElement.innerHTML =
                    lines.slice(0, currentLine).join('<br>') +
                    '<br>' + currentText.substring(0, charIndex) +
                    (charIndex < currentText.length ? '_' : '');
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
            else if (isDeleting && charIndex >= 0) {
                textElement.innerHTML =
                    lines.slice(0, currentLine).join('<br>') +
                    '<br>' + currentText.substring(0, charIndex) + '_';
                charIndex--;
                setTimeout(typeWriter, typingSpeed / 2);
            }
            else {
                isDeleting = false;
                currentLine++;
                charIndex = 0;
                setTimeout(typeWriter, lineDelay);
            }
        } else {
            stopSound();
            textElement.innerHTML = originalText.replace('_', '');
        }
    }

    setTimeout(typeWriter, 500);
});