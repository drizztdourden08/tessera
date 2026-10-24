/* @layer renderer-components @kind logic */
import type { GridLayout, LayoutRow, SectionShape } from './grid-layout.type';

const gridLayout = (sections: readonly SectionShape[], columns: number): GridLayout => {
  const wide = Math.max(1, columns);
  const rows: LayoutRow[] = [];
  let heads = 0;
  let tiles = 0;
  let stop = 0;
  let items = 0;
  sections.forEach((shape, section) => {
    if (shape.header) {
      rows.push({ kind: 'header', section, heads, tiles, stop, first: items, size: 1 });
      heads += 1;
      stop += 1;
    }
    for (let at = 0; !shape.collapsed && at < shape.count; at += wide) {
      const size = Math.min(wide, shape.count - at);
      rows.push({ kind: 'tiles', section, heads, tiles, stop, first: items + at, size });
      tiles += 1;
      stop += size;
    }
    items += shape.count;
  });
  return { rows, headers: heads, tileRows: tiles, stops: stop, items };
};

export { gridLayout };
