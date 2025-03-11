function applyFont() {
  let style = document.getElementById("opendyslexic-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "opendyslexic-style";
    style.innerHTML = `
      @import url('https://fonts.cdnfonts.com/css/opendyslexic');
      @layer utilities;

      @layer utilities {
        *:not([class*="icon"]) {
          font-family: 'OpenDyslexic', sans-serif !important;
          font-weight: 700;
          font-style: normal;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function removeFont() {
  const style = document.getElementById("opendyslexic-style");
  if (style) {
    style.remove();
  }
}

function updateFont() {
  const style = document.getElementById("opendyslexic-style");
  if (style) {
    style.remove();
  }
}

chrome.storage.sync.get("fontActive", (data) => {
  if (data.fontActive) {
    applyFont();
  }
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.fontActive) {
    if (changes.fontActive.newValue) {
      applyFont();
    } else {
      removeFont();
    }
  }
});
