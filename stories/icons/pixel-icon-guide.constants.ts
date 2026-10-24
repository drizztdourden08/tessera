/* @layer stories @kind data */
const PIXEL_ICON_SIZES = [16, 32, 48] as const;

const PIXEL_ICON_RULES = [
  'Grid: 16 by 16, drawn as 16 lines of 16 characters, # for ink and . for empty.',
  'One colour: ink draws in currentColor, so there are no shading colours.',
  'Lines are 1 px. A diagonal is never thicker than 1 px.',
  'Margin: keep 1 px clear, so draw inside 14 by 14, unless the shape needs the edge.',
  'Light comes from the top left: a lit edge is a line, a shaded side is solid or open, never a second colour.',
  'It must be recognisable at 16 px. If a detail vanishes there, drop the detail.',
  'Size it at 16, 32 or 48 px. Other sizes blur the pixel edges.',
  'Name it pixel-<name>, and put it in a data file src/primitives/icon-sets/pixel-<group>.constants.ts.',
] as const;

export { PIXEL_ICON_RULES, PIXEL_ICON_SIZES };
