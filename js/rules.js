const confirmed = new Set();

document.querySelectorAll("[data-player]").forEach((button) => {
  button.addEventListener("click", () => {
    confirmed.add(button.dataset.player);
    button.classList.add("done");
    button.disabled = true;
    if (confirmed.size === 2) {
      window.location.href = "setup.html";
    }
  });
});
