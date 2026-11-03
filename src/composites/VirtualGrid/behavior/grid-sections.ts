/* @layer renderer-components @kind logic */
import type { VirtualGridSection } from '../VirtualGrid.type';
import type { GridSections } from './grid-sections.type';

const gridSections = <T,>(items: readonly T[] | undefined, sections: readonly VirtualGridSection<T>[] | undefined, collapsed: ReadonlySet<string>, trailing = false): GridSections<T> => {
  const extra = trailing ? 1 : 0;
  if (!sections) {
    const all = items ?? [];
    return { flat: all, shapes: [{ header: false, count: all.length + extra, collapsed: false }], keys: [''] };
  }
  return {
    flat: sections.flatMap((section) => section.items),
    shapes: sections.map((section, at) => ({ header: true, count: section.items.length + (at === sections.length - 1 ? extra : 0), collapsed: collapsed.has(section.key) })),
    keys: sections.map((section) => section.key),
  };
};

export { gridSections };
