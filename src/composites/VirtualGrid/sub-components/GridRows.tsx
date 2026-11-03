/* @layer renderer-components @kind component */
import { GridHeader } from './GridHeader';
import { GridRow } from './GridRow';
import { GridTiles } from './GridTiles';
import { rowPlace } from '../behavior/row-place';
import type { GridRowsProps } from './GridRows.type';

const GridRows = <T,>(props: GridRowsProps<T>) => {
  const { model, sections, getKey } = props;
  const { layout, flat, columns } = model;
  return model.rows.map((at) => {
    const row = layout.rows[at];
    if (!row) return null;
    const top = model.measured ? rowPlace(row, model.heights, at).top : undefined;
    if (row.kind === 'header') {
      const section = sections?.[row.section];
      if (!section) return null;
      return (
        <GridRow key={`section-${section.key}`} at={at} row={row} top={top}>
          <GridHeader
            stop={row.stop}
            label={section.label}
            count={section.count ?? section.items.length}
            columns={columns}
            collapsed={model.collapsed.has(section.key)}
            tabbable={row.stop === model.tabbable}
            depth={section.depth}
            into={model.into === section.key}
            actions={section.actions}
            drop={model.dropOf(section)}
            onToggle={(next) => model.setCollapsed(section.key, next)}
            onActivate={model.activate}
            onNavigate={model.navigate}
          />
        </GridRow>
      );
    }
    const firstItem = flat[row.first];
    return (
      <GridRow key={firstItem === undefined ? 'row-trailing' : `row-${getKey(firstItem, row.first)}`} at={at} row={row} top={top}>
        <GridTiles {...props} row={row} />
      </GridRow>
    );
  });
};

export { GridRows };
