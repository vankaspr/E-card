function openModal(title, text, imgUrl) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-text").textContent = text;
  document.getElementById("modal-image").src = imgUrl;
  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
};
