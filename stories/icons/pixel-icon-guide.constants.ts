/* @layer stories @kind data */
const PIXEL_ICON_SIZES = [24, 48, 72] as const;

const PIXEL_ICON_RULES = [
  'Grid: 24 by 24, drawn as 24 lines of 24 characters, # for ink and . for empty.',
  'Margin: keep 2 px clear on every side, so draw inside 20 by 20.',
  'One colour: ink draws in currentColor. Shade with a dither pattern, never a second colour.',
  'Lines are 1 px. Use 2 px only where a shape needs weight to read, such as a lens rim, a handle or an arrow shaft, and use it the same way in every icon.',
  'No anti-aliasing: a pixel is ink or empty, never half.',
  'Clean curves: no doubled corners where two runs meet, and no jaggy diagonals. Step diagonals evenly at 1:1, 2:1 or 1:2, and let curve runs grow or shrink one step at a time.',
  'Tools held in the hand, such as the pencil, eraser and eyedropper, lie at 45 degrees with the working end at the bottom left.',
  'It must read as its tool at 24 px. If a detail vanishes there, drop the detail.',
  'Size it at 24, 48 or 72 px. Icon snaps any other size to the nearest multiple of 24, never below 24, and IconButton and Button grow to hold it.',
  'Name it pixel-<name>, and put it in a data file src/primitives/icon-sets/pixel-<group>.constants.ts.',
] as const;

export { PIXEL_ICON_RULES, PIXEL_ICON_SIZES };
