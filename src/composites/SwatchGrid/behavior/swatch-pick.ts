/* @layer renderer-components @kind util */
import type { SwatchModifiers, SwatchPickInput } from '../SwatchGrid.type';
import { pickIntent } from './pick-intent';
import { rangeAnchor } from './range-anchor';

const swatchPick = ({ colors, selectedIndex, onSelect, onSecondarySelect, onRangeChange }: SwatchPickInput) =>
  (index: number, held: SwatchModifiers): void => {
    const color = colors[index];
    if (!color) return;
    const intent = pickIntent(held, { range: onRangeChange !== undefined, secondary: onSecondarySelect !== undefined });
    if (intent === 'range') onRangeChange?.(rangeAnchor(selectedIndex, index), index);
    else if (intent === 'secondary') onSecondarySelect?.(color.id);
    else onSelect?.(color.id);
  };

export { swatchPick };
