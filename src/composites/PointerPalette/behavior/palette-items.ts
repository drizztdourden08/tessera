/* @layer renderer-components @kind logic */
import type { PaletteItem, PaletteSection } from '../PointerPalette.type';

const paletteItems = (sections: readonly PaletteSection[]): ReadonlyMap<string, PaletteItem> =>
  new Map(sections.flatMap((section) => section.items.map((item) => [item.id, item] as const)));

export { paletteItems };
