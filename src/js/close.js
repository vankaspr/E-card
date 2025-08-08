// close.js
document.addEventListener('DOMContentLoaded', () => {
    const closeButtons = document.querySelectorAll('.close-icon');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.history.back();

        });
    });
});