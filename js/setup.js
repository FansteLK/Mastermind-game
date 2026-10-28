(function () {
  const { SYMBOLS, CODE_LENGTH, isValidCode } = Scoring;

  let player = 1;
  let code = Array(CODE_LENGTH).fill(null);

  const title = document.getElementById("title");
  const hint = title.nextElementSibling;
  const saveButton = document.getElementById("save");
  const codeEl = UI.createCode(CODE_LENGTH);
  document.getElementById("code").appendChild(codeEl);
  document.getElementById("palette").appendChild(
    UI.createPalette(SYMBOLS, (symbol) => {
      if (placeSymbol(code, symbol)) render();
    })
  );

  function render() {
    UI.renderCode(codeEl, code, (i) => {
      code[i] = null;
      render();
    });
    saveButton.disabled = !isValidCode(code);
  }

  saveButton.addEventListener("click", () => {
    if (!isValidCode(code)) return;
    // Player 1's code is the one Player 2 has to crack, and vice versa.
    Storage.save(`code${player}`, code);
    if (player === 1) {
      player = 2;
      code = Array(CODE_LENGTH).fill(null);
      title.textContent = "Player 2: set your code";
      hint.textContent = hint.textContent.replace("Player 2", "Player 1");
      render();
    } else {
      window.location.href = "game.html";
    }
  });

  render();
})();
