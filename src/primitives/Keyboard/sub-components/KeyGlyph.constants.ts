/* @layer renderer-components @kind constants */
const KEY_SYMBOLS = {
  command: { strokes: ['M10 4v8a2 2 0 1 0 2-2H4a2 2 0 1 0 2 2V4a2 2 0 1 0-2 2h8a2 2 0 1 0-2-2'] },
  option: { strokes: ['M2 4.5h3.5l5 7H14', 'M10 4.5h4'] },
  control: { strokes: ['M4 9.5l4-4 4 4'] },
  shift: { strokes: ['M8 2.5L2.5 8.5h3V13h5V8.5h3z'] },
  capslock: { strokes: ['M8 2L3 7.5h2.5v3h5v-3H13z', 'M5.5 13.5h5'] },
  tab: { strokes: ['M2.5 8h10', 'M9 4.5L12.5 8 9 11.5', 'M13.5 4v8'] },
  enter: { strokes: ['M13 3.5V8a1.5 1.5 0 0 1-1.5 1.5H3', 'M6 6.5l-3 3 3 3'] },
  backspace: { strokes: ['M5.5 3.5h8v9h-8L1.5 8z', 'M7.5 6l3 4', 'M10.5 6l-3 4'] },
  delete: { strokes: ['M10.5 3.5h-8v9h8l4-4.5z', 'M5.5 6l3 4', 'M8.5 6l-3 4'] },
  home: { strokes: ['M12 12L4 4', 'M4 9V4h5'] },
  end: { strokes: ['M4 4l8 8', 'M12 7v5H7'] },
  pageup: { strokes: ['M8 13V5', 'M4.5 8.5L8 5l3.5 3.5', 'M3.5 2.5h9'] },
  pagedown: { strokes: ['M8 3v8', 'M4.5 7.5L8 11l3.5-3.5', 'M3.5 13.5h9'] },
  up: { strokes: ['M8 13V3', 'M4 7l4-4 4 4'] },
  down: { strokes: ['M8 3v10', 'M4 9l4 4 4-4'] },
  left: { strokes: ['M13 8H3', 'M7 4L3 8l4 4'] },
  right: { strokes: ['M3 8h10', 'M9 4l4 4-4 4'] },
} as const;

export { KEY_SYMBOLS };
