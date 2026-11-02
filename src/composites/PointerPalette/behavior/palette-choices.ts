/* @layer renderer-components @kind logic */
import type { ChoiceSection } from '../../ChoiceGrid';
import type { PaletteSection } from '../PointerPalette.type';

const paletteChoices = (sections: readonly PaletteSection[]): ChoiceSection[] =>
  sections.map((section) => ({
    id: section.id,
    label: section.label,
    cells: section.items.map((item) => ({ value: item.id, label: item.label, disabled: item.disabled })),
  }));

export { paletteChoices };
