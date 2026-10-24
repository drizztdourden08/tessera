/* @layer renderer-components @kind util */
import type { SwatchModifiers, SwatchPickKind } from '../SwatchGrid.type';

const pickIntent = (held: SwatchModifiers, can: { range: boolean; secondary: boolean }): SwatchPickKind => {
  if (held.ctrlKey || held.metaKey) return can.secondary ? 'secondary' : 'select';
  return held.shiftKey && can.range ? 'range' : 'select';
};

export { pickIntent };
