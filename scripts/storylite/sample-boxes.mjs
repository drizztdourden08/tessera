/* @layer tooling-scripts @kind logic */
/* global document, performance, requestAnimationFrame */

const sampleBoxes = async ({ parts, ms, slack }) => {
  const targets = parts.flatMap((selector) => [...document.querySelectorAll(selector)].map((el, index) => ({ name: `${selector} #${index + 1}`, el })));
  const seen = new Map();
  const start = performance.now();
  while (performance.now() - start < ms) {
    await new Promise((resolve) => { requestAnimationFrame(resolve); });
    for (const { name, el } of targets) {
      const box = el.getBoundingClientRect();
      if (el.isConnected && (box.width > 0 || box.height > 0)) {
        const key = `${name} "${el.textContent.replace(/\d/g, '0').slice(0, 40)}"`;
        const range = seen.get(key) ?? { w: [box.width, box.width], h: [box.height, box.height] };
        range.w = [Math.min(range.w[0], box.width), Math.max(range.w[1], box.width)];
        range.h = [Math.min(range.h[0], box.height), Math.max(range.h[1], box.height)];
        seen.set(key, range);
      }
    }
  }
  const span = ([low, high]) => `${low.toFixed(2)} to ${high.toFixed(2)}`;
  return [...seen].filter(([, { w, h }]) => w[1] - w[0] > slack || h[1] - h[0] > slack)
    .map(([key, { w, h }]) => `${key} width ${span(w)}, height ${span(h)} px`);
};

export { sampleBoxes };
