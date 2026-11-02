/* @layer stories @kind logic */
const mixed = (base: string, share: number, into: string): string => `color-mix(in srgb, var(${base}) ${String(share)}%, var(${into}))`;

const blue = (share: number, into = '--p-black'): string => mixed('--p-info', share, into);

const BLUES = [
  { color: blue(20) }, { color: blue(35) }, { color: blue(50) }, { color: blue(65) },
  { color: blue(80) }, { color: blue(90) }, { color: blue(60, '--p-pure-white') }, { color: blue(30, '--p-pure-white') },
];

const NAMED = [
  { color: mixed('--p-danger', 25, '--p-black'), caption: 'Shade', label: 'Shade' },
  { color: mixed('--p-danger', 80, '--p-black'), caption: 'Base', label: 'Base' },
  { color: mixed('--p-tag-orange', 85, '--p-pure-white'), caption: 'Light', label: 'Light' },
  { color: mixed('--p-warning', 35, '--p-pure-white'), caption: 'Glow', label: 'Glow' },
];

const UNUSED_STEPS = [
  { color: BLUES[0].color }, { color: BLUES[2].color, unused: true }, { color: BLUES[4].color },
  { color: BLUES[6].color, disabled: true }, { color: BLUES[7].color },
];

export { BLUES, NAMED, UNUSED_STEPS };
