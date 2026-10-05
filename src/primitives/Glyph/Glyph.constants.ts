/* @layer renderer-components @kind data */
const GLYPHS = {
  sortBoth: ['M8 2.5v11', 'M5 5l3-3 3 3', 'M5 11l3 3 3-3'],
  widen: ['M2.5 8h11', 'M5 5L2 8l3 3', 'M11 5l3 3-3 3'],
  box: ['M2.5 5L8 2.5 13.5 5v6L8 13.5 2.5 11z', 'M2.5 5L8 7.5 13.5 5', 'M8 7.5v6'],
  minus: ['M3 8h10'],
  windowMinimize: ['M3.5 8h9'],
  windowMaximize: ['M3.5 3.5h9v9h-9z'],
  windowRestore: ['M3 5.5h7.5V13H3z', 'M5.5 5.5V3H13v7.5h-2.5'],
  windowClose: ['M3.5 3.5l9 9', 'M12.5 3.5l-9 9'],
} satisfies Record<string, string[]>;

export { GLYPHS };
