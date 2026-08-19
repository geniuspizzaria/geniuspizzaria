/* ============================================================
   GENIUS PIZZARIA — movimento da cena
   ============================================================ */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- estrelas de 4 pontas ---------- */
  const starsBox = document.getElementById("stars");
  const N_STARS = 26;
  for (let i = 0; i < N_STARS; i++) {
    const s = document.createElement("span");
    const size = 8 + Math.random() * 18;
    // mantém as estrelas fora do miolo (onde fica a ilha)
    let x, y;
    do {
      x = Math.random() * 100;
      y = Math.random() * 100;
    } while (x > 26 && x < 74 && y > 22 && y < 82);
    s.style.left = x + "%";
    s.style.top = y + "%";
    s.style.setProperty("--s", size.toFixed(1) + "px");
    s.style.setProperty("--t", (2.6 + Math.random() * 3.4).toFixed(2) + "s");
    s.style.setProperty("--d", (-Math.random() * 6).toFixed(2) + "s");
    if (Math.random() < 0.22) s.style.setProperty("--c", "#fff3d9");
    starsBox.appendChild(s);
  }

  /* ---------- fagulhas ---------- */
  const embersBox = document.getElementById("embers");
  if (!reduceMotion) {
    const N_EMBERS = 14;
    for (let i = 0; i < N_EMBERS; i++) {
      const e = document.createElement("i");
      e.style.left = Math.random() * 100 + "%";
      e.style.setProperty("--s", (3 + Math.random() * 5).toFixed(1) + "px");
      e.style.setProperty("--t", (9 + Math.random() * 9).toFixed(2) + "s");
      e.style.setProperty("--d", (-Math.random() * 18).toFixed(2) + "s");
      e.style.setProperty("--drift", ((Math.random() - 0.5) * 120).toFixed(0) + "px");
      embersBox.appendChild(e);
    }
  }
})();
