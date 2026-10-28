// Small DOM helpers shared by the setup and game pages.
const UI = {
  symbolSrc(symbol) {
    return `assets/symbols/${symbol}.png`;
  },

  createCode(length) {
    const code = document.createElement("div");
    code.className = "code";
    for (let i = 0; i < length; i++) {
      const slot = document.createElement("div");
      slot.className = "slot";
      code.appendChild(slot);
    }
    return code;
  },

  // Render `symbols` (array with null for empty) into the slots of `codeEl`.
  renderCode(codeEl, symbols, onRemove) {
    [...codeEl.children].forEach((slot, i) => {
      slot.replaceChildren();
      slot.classList.toggle("filled", Boolean(symbols[i]));
      slot.onclick = null;
      if (symbols[i]) {
        const img = document.createElement("img");
        img.src = UI.symbolSrc(symbols[i]);
        img.alt = symbols[i];
        slot.appendChild(img);
        if (onRemove) slot.onclick = () => onRemove(i);
      }
    });
  },

  createPalette(symbols, onPick) {
    const palette = document.createElement("div");
    palette.className = "palette";
    for (const symbol of symbols) {
      const button = document.createElement("button");
      button.type = "button";
      button.title = symbol;
      const img = document.createElement("img");
      img.src = UI.symbolSrc(symbol);
      img.alt = symbol;
      button.appendChild(img);
      button.addEventListener("click", () => onPick(symbol));
      palette.appendChild(button);
    }
    return palette;
  },

  setPaletteEnabled(palette, enabled) {
    palette.querySelectorAll("button").forEach((b) => (b.disabled = !enabled));
  },
};

// Fill the first empty position of `code` with `symbol`. Returns true if placed.
function placeSymbol(code, symbol) {
  const i = code.indexOf(null);
  if (i === -1) return false;
  code[i] = symbol;
  return true;
}

const Storage = {
  save(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* storage unavailable: the game page will send players back to setup */
    }
  },
  load(key) {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (e) {
      return null;
    }
  },
};
