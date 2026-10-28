(function () {
  const { SYMBOLS, CODE_LENGTH, MAX_ATTEMPTS, TIME_PER_PLAYER, score, isValidCode } = Scoring;

  // Player N guesses the code set by the other player.
  const secrets = { 1: Storage.load("code2"), 2: Storage.load("code1") };
  if (!isValidCode(secrets[1]) || !isValidCode(secrets[2])) {
    window.location.href = "index.html";
    return;
  }

  const clockEl = document.getElementById("clock");
  const clockLabel = document.getElementById("clock-label");
  const statusEl = document.getElementById("status");
  const startButton = document.getElementById("start");

  const players = { 1: buildBoard(1), 2: buildBoard(2) };
  const timeLeft = { 1: TIME_PER_PLAYER, 2: TIME_PER_PLAYER };
  let current = 1;
  let guess = Array(CODE_LENGTH).fill(null);
  let timer = null;
  let running = false;

  function buildBoard(player) {
    const section = document.getElementById(`player${player}`);
    const attempts = [];
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const row = document.createElement("div");
      row.className = "attempt";
      const code = UI.createCode(CODE_LENGTH);
      const check = document.createElement("button");
      check.type = "button";
      check.className = "check";
      check.textContent = "✓";
      check.title = "Check guess";
      check.disabled = true;
      check.addEventListener("click", submitGuess);
      const feedback = document.createElement("div");
      feedback.className = "feedback";
      row.append(code, check, feedback);
      section.appendChild(row);
      attempts.push({ code, check, feedback });
    }
    const palette = UI.createPalette(SYMBOLS, pickSymbol);
    UI.setPaletteEnabled(palette, false);
    section.appendChild(palette);

    const solution = document.createElement("div");
    solution.className = "solution";
    solution.innerHTML = "<h3>Code to crack</h3>";
    const solutionCode = UI.createCode(CODE_LENGTH);
    solution.appendChild(solutionCode);
    section.appendChild(solution);

    return { section, attempts, palette, solutionCode, attempt: 0 };
  }

  function currentRow() {
    const p = players[current];
    return p.attempts[p.attempt];
  }

  function renderGuess() {
    const row = currentRow();
    UI.renderCode(row.code, guess, (i) => {
      guess[i] = null;
      renderGuess();
    });
    row.check.disabled = !isValidCode(guess);
  }

  function pickSymbol(symbol) {
    if (!running) return;
    if (placeSymbol(guess, symbol)) renderGuess();
  }

  function renderFeedback(el, { exact, misplaced }) {
    const pegs = [...Array(exact).fill("red"), ...Array(misplaced).fill("yellow")];
    for (const color of pegs) {
      const img = document.createElement("img");
      img.src = `assets/pegs/${color}.png`;
      img.alt = color === "red" ? "right place" : "wrong place";
      el.appendChild(img);
    }
  }

  function setTurn(player) {
    current = player;
    guess = Array(CODE_LENGTH).fill(null);
    for (const p of [1, 2]) {
      players[p].section.classList.toggle("active", p === player);
      UI.setPaletteEnabled(players[p].palette, p === player);
    }
    renderClock();
    renderGuess();
  }

  function submitGuess() {
    if (!running || !isValidCode(guess)) return;
    const p = players[current];
    const row = currentRow();
    // Freeze the submitted row so its symbols can no longer be removed.
    UI.renderCode(row.code, guess);
    row.check.disabled = true;
    const result = score(secrets[current], guess);
    renderFeedback(row.feedback, result);
    p.attempt++;

    if (result.exact === CODE_LENGTH) {
      return endGame(`Player ${current} cracked the code and wins!`);
    }
    if (current === 2 && p.attempt === MAX_ATTEMPTS) {
      return endGame("Nobody cracked the code. It's a draw.");
    }
    setTurn(current === 1 ? 2 : 1);
  }

  function renderClock() {
    clockEl.textContent = timeLeft[current];
    clockLabel.textContent = `Player ${current}: seconds left`;
  }

  function tick() {
    timeLeft[current]--;
    renderClock();
    if (timeLeft[current] <= 0) {
      const winner = current === 1 ? 2 : 1;
      endGame(`Player ${current} ran out of time. Player ${winner} wins!`);
    }
  }

  function endGame(message) {
    running = false;
    clearInterval(timer);
    statusEl.textContent = message;
    for (const p of [1, 2]) {
      players[p].section.classList.remove("active");
      UI.setPaletteEnabled(players[p].palette, false);
      players[p].attempts.forEach((a) => (a.check.disabled = true));
      UI.renderCode(players[p].solutionCode, secrets[p]);
    }
  }

  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    running = true;
    statusEl.textContent = "";
    setTurn(1);
    timer = setInterval(tick, 1000);
  });

  document.getElementById("new-game").addEventListener("click", () => {
    window.location.href = "setup.html";
  });

  renderClock();
})();
