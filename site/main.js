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

  /* ---------- parallax (mouse + giroscópio) ---------- */
  const layers = document.querySelectorAll(".p");
  let targetX = 0, targetY = 0;   // -1..1
  let curX = 0, curY = 0;

  if (!reduceMotion) {
    window.addEventListener("pointermove", (ev) => {
      targetX = (ev.clientX / window.innerWidth) * 2 - 1;
      targetY = (ev.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    // celular: inclinação do aparelho (quando disponível sem permissão)
    window.addEventListener("deviceorientation", (ev) => {
      if (ev.gamma == null || ev.beta == null) return;
      targetX = Math.max(-1, Math.min(1, ev.gamma / 28));
      targetY = Math.max(-1, Math.min(1, (ev.beta - 45) / 28));
    }, { passive: true });

    // pré-calcula as profundidades uma única vez
    const items = Array.from(layers, (el) => ({
      el,
      depth: parseFloat(el.dataset.depth || "0.3"),
    }));

    const AMPLITUDE = 26; // px máximos de deslocamento
    (function tick() {
      const dx = targetX - curX;
      const dy = targetY - curY;
      // só escreve no DOM quando há movimento perceptível
      if (Math.abs(dx) + Math.abs(dy) > 0.0008) {
        curX += dx * 0.055;
        curY += dy * 0.055;
        for (const { el, depth } of items) {
          el.style.transform =
            "translate3d(" + (curX * AMPLITUDE * depth).toFixed(2) + "px," +
            (curY * AMPLITUDE * depth).toFixed(2) + "px,0)";
        }
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ---------- pulo da ilha ao clicar ---------- */
  const island = document.getElementById("island");
  island.addEventListener("click", () => {
    island.classList.remove("boing");
    // força reinício da animação
    void island.offsetWidth;
    island.classList.add("boing");
  });
  island.addEventListener("animationend", (ev) => {
    if (ev.animationName === "boing") island.classList.remove("boing");
  });
})();
