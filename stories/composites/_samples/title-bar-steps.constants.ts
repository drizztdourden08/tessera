/* @layer stories @kind data */
const TITLE_BAR_STEPS = [
  { width: 720, note: '720 px: room for everything.' },
  { width: 560, note: '560 px: Report a bug moves to the menu.' },
  { width: 540, note: '540 px: full screen moves to the menu.' },
  { width: 480, note: '480 px: the pin moves to the menu; the whole brand still fits.' },
  { width: 400, note: '400 px: Update available moves to the menu, the title goes and the logo stays alone.' },
  { width: 314, note: '314 px: the logo shrinks.' },
  { width: 260, note: '260 px: the middle empties. Minimize, maximize and close never hide.' },
] as const;

export { TITLE_BAR_STEPS };
