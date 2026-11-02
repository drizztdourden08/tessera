/* @layer renderer-components @kind logic */
import type { ChoiceSection } from '../../ChoiceGrid';
import type { PaletteItem, PaletteSection } from '../PointerPalette.type';

const paletteChoices = (sections: readonly PaletteSection[]): ChoiceSection[] =>
  sections.map((section) => ({
    id: section.id,
    label: section.label,
    cells: section.items.map((item) => ({ value: item.id, label: item.label, disabled: item.disabled })),
  }));

const paletteItems = (sections: readonly PaletteSection[]): ReadonlyMap<string, PaletteItem> =>
  new Map(sections.flatMap((section) => section.items.map((item) => [item.id, item] as const)));

export { paletteChoices, paletteItems };
