/* @layer stories @kind data */
const TITLE_BAR_STEPS = [
  { width: 720, note: '720 px: room for everything.' },
  { width: 600, note: '600 px: Report a bug moves to the menu.' },
  { width: 540, note: '540 px: the pin and full screen move to the menu.' },
  { width: 472, note: '472 px: Update available moves to the menu; the whole brand still fits.' },
  { width: 400, note: '400 px: the title goes and the logo stays alone.' },
  { width: 314, note: '314 px: the logo shrinks.' },
  { width: 260, note: '260 px: the middle empties. Minimize, maximize and close never hide.' },
] as const;

export { TITLE_BAR_STEPS };
