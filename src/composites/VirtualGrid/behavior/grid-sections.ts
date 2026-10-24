/* @layer renderer-components @kind logic */
import type { VirtualGridSection } from '../VirtualGrid.type';
import type { GridSections } from './grid-sections.type';

const gridSections = <T,>(items: readonly T[] | undefined, sections: readonly VirtualGridSection<T>[] | undefined, collapsed: ReadonlySet<string>): GridSections<T> => {
  if (!sections) {
    const all = items ?? [];
    return { flat: all, shapes: [{ header: false, count: all.length, collapsed: false }], keys: [''] };
  }
  return {
    flat: sections.flatMap((section) => section.items),
    shapes: sections.map((section) => ({ header: true, count: section.items.length, collapsed: collapsed.has(section.key) })),
    keys: sections.map((section) => section.key),
  };
};

export { gridSections };
