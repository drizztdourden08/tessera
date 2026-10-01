/* @layer renderer-components @kind data */
const GLYPHS = {
  check: ['M3.5 8.5l3 3 6-7'],
  close: ['M4 4l8 8M12 4l-8 8'],
  chevronDown: ['M4 6l4 4 4-4'],
  chevronUp: ['M4 10l4-4 4 4'],
  chevronRight: ['M6 4l4 4-4 4'],
  chevronLeft: ['M10 4l-4 4 4 4'],
  sortBoth: ['M8 2.5v11', 'M5 5l3-3 3 3', 'M5 11l3 3 3-3'],
  widen: ['M2.5 8h11', 'M5 5L2 8l3 3', 'M11 5l3 3-3 3'],
  arrowUp: ['M8 13.5v-11', 'M4 6.5l4-4 4 4'],
  arrowDown: ['M8 2.5v11', 'M4 9.5l4 4 4-4'],
  edit: ['M10.5 2.5l3 3-8 8H2.5v-3z'],
  copy: ['M5.5 5.5h8v8h-8z', 'M10.5 5.5v-3h-8v8h3'],
  external: ['M6.5 3H3v10h10V9.5', 'M9 2.5h4.5V7', 'M13.5 2.5L7 9'],
  gear: [
    'M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z',
    'M8 1.5v2', 'M8 12.5v2', 'M1.5 8h2', 'M12.5 8h2',
    'M3.4 3.4l1.4 1.4', 'M11.2 11.2l1.4 1.4', 'M3.4 12.6l1.4-1.4', 'M11.2 4.8l1.4-1.4',
  ],
  box: ['M2.5 5L8 2.5 13.5 5v6L8 13.5 2.5 11z', 'M2.5 5L8 7.5 13.5 5', 'M8 7.5v6'],
  volume: ['M2.5 6h2.5l3.5-3v10L5 10H2.5z', 'M11 5.5a3.5 3.5 0 0 1 0 5', 'M12.5 3.5a6 6 0 0 1 0 9'],
  mute: ['M2.5 6h2.5l3.5-3v10L5 10H2.5z', 'M11 6l3.5 4', 'M14.5 6L11 10'],
  plus: ['M8 3v10', 'M3 8h10'],
  minus: ['M3 8h10'],
  monitor: ['M2 3.5h12v8H2z', 'M6 14h4', 'M8 11.5V14'],
  gamepad: [
    'M4.5 5h7a3 3 0 0 1 3 3v1a2.5 2.5 0 0 1-4.5 1.5L9 9.5H7l-1 1A2.5 2.5 0 0 1 1.5 9V8a3 3 0 0 1 3-3z',
    'M5 6.8v2.4', 'M3.8 8h2.4', 'M11 7.5v.01', 'M12 8.7v.01',
  ],
  save: ['M2.5 2.5H11l2.5 2.5v8.5h-11z', 'M5 2.5V6h5V2.5', 'M5 13.5v-4h6v4'],
  windowMinimize: ['M3.5 8h9'],
  windowMaximize: ['M3.5 3.5h9v9h-9z'],
  windowRestore: ['M3 5.5h7.5V13H3z', 'M5.5 5.5V3H13v7.5h-2.5'],
  windowClose: ['M3.5 3.5l9 9', 'M12.5 3.5l-9 9'],
} satisfies Record<string, string[]>;

export { GLYPHS };
