const test = require("node:test");
const assert = require("node:assert/strict");
const { score, isValidCode, SYMBOLS } = require("../js/scoring.js");

test("all symbols in the right place", () => {
  assert.deepEqual(score(["star", "club", "heart", "spade"], ["star", "club", "heart", "spade"]), {
    exact: 4,
    misplaced: 0,
  });
});

test("no matching symbols", () => {
  assert.deepEqual(score(["star", "star", "star", "star"], ["club", "club", "club", "club"]), {
    exact: 0,
    misplaced: 0,
  });
});

test("all symbols present but misplaced", () => {
  assert.deepEqual(score(["star", "club", "heart", "spade"], ["spade", "heart", "club", "star"]), {
    exact: 0,
    misplaced: 4,
  });
});

test("duplicates in the guess are not double counted", () => {
  // Only one star in the secret, so only one yellow peg.
  assert.deepEqual(score(["star", "club", "club", "club"], ["heart", "star", "star", "star"]), {
    exact: 0,
    misplaced: 1,
  });
});

test("an exact match consumes the symbol before misplaced matching", () => {
  assert.deepEqual(score(["star", "club", "heart", "spade"], ["star", "star", "diamond", "diamond"]), {
    exact: 1,
    misplaced: 0,
  });
});

test("duplicates in the secret", () => {
  assert.deepEqual(score(["heart", "heart", "club", "club"], ["club", "heart", "heart", "star"]), {
    exact: 1,
    misplaced: 2,
  });
});

test("score rejects mismatched lengths", () => {
  assert.throws(() => score(["star"], ["star", "club"]));
});

test("isValidCode", () => {
  assert.equal(isValidCode(SYMBOLS.slice(0, 4)), true);
  assert.equal(isValidCode(["star", "club", "heart"]), false);
  assert.equal(isValidCode(["star", "club", "heart", "unicorn"]), false);
  assert.equal(isValidCode(null), false);
});
