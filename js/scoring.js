// Pure game rules, shared by the browser and the Node test suite.
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Scoring = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  const SYMBOLS = ["skocko", "club", "spade", "heart", "diamond", "star"];
  const CODE_LENGTH = 4;
  const MAX_ATTEMPTS = 7;
  const TIME_PER_PLAYER = 60;

  /**
   * Compare a guess against the secret code.
   * exact: right symbol in the right position (red peg)
   * misplaced: right symbol in the wrong position (yellow peg)
   */
  function score(secret, guess) {
    if (secret.length !== guess.length) {
      throw new Error("secret and guess must have the same length");
    }
    let exact = 0;
    const secretLeft = {};
    const guessLeft = [];
    for (let i = 0; i < secret.length; i++) {
      if (secret[i] === guess[i]) {
        exact++;
      } else {
        secretLeft[secret[i]] = (secretLeft[secret[i]] || 0) + 1;
        guessLeft.push(guess[i]);
      }
    }
    let misplaced = 0;
    for (const symbol of guessLeft) {
      if (secretLeft[symbol] > 0) {
        secretLeft[symbol]--;
        misplaced++;
      }
    }
    return { exact, misplaced };
  }

  function isValidCode(code) {
    return (
      Array.isArray(code) &&
      code.length === CODE_LENGTH &&
      code.every((s) => SYMBOLS.includes(s))
    );
  }

  return { SYMBOLS, CODE_LENGTH, MAX_ATTEMPTS, TIME_PER_PLAYER, score, isValidCode };
});
