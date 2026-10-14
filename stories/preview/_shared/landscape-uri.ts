/* @layer stories @kind logic */
const landscapeUri = (sky: string, hills: string, sun: string, caption: string): string => {
  const svg = [
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180' width='1280' height='720'>`,
    `<rect width='320' height='180' fill='${sky}'/>`,
    `<circle cx='250' cy='46' r='20' fill='${sun}'/>`,
    `<path d='M0 140 L80 88 L140 124 L208 72 L320 136 V180 H0Z' fill='${hills}'/>`,
    `<text x='14' y='166' font-family='monospace' font-size='12' fill='white'>${caption}</text>`,
    '</svg>',
  ].join('');
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export { landscapeUri };
