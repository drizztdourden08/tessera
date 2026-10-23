/* @layer stories @kind logic */
import type { SwatchColor, SwatchRange } from '../../../src/composites';

const swatchSummary = (colors: readonly SwatchColor[], selectedId?: string, secondaryId?: string, range?: SwatchRange): string => {
  const at = (id: string | undefined): string => String(colors.findIndex((color) => color.id === id));
  const parts = [`Selected ${at(selectedId)}`, `background ${at(secondaryId)}`];
  if (range) parts.push(`range ${String(range.from)} to ${String(range.to)}`);
  return parts.join(', ');
};

export { swatchSummary };
