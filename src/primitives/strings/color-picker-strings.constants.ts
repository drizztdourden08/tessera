/* @layer renderer-components @kind data */
const COLOR_PICKER_STRINGS = {
  quickAssign: 'Quick assign',
  snapped: 'snapped',
  was: (hex: string) => `was ${hex}`,
  original: (hex: string) => `Original ${hex}`,
  current: (hex: string) => `Current colour, ${hex}`,
  modes: 'Colour model',
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
  hue: 'Hue',
  saturation: 'Saturation',
  value: 'Value',
  lightness: 'Lightness',
  chroma: 'Chroma',
  alpha: 'Alpha',
  outOfGamut: 'Outside the sRGB range, shown at the nearest colour that fits',
};

export { COLOR_PICKER_STRINGS };
