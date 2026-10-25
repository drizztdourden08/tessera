/* @layer renderer-components @kind component */
import { GridCell } from './GridCell';
import { GridHeader } from './GridHeader';
import { GridRow } from './GridRow';
import type { GridRowsProps } from './GridRows.type';

const GridRows = <T,>(props: GridRowsProps<T>) => {
  const { model, sections, getKey, renderItem } = props;
  const { layout, flat, columns } = model;
  return model.rows.map((at) => {
    const row = layout.rows[at];
    if (!row) return null;
    if (row.kind === 'header') {
      const section = sections?.[row.section];
      if (!section) return null;
      return (
        <GridRow key={`section-${section.key}`} at={at} row={row}>
          <GridHeader
            stop={row.stop}
            label={section.label}
            count={section.count ?? section.items.length}
            columns={columns}
            collapsed={model.collapsed.has(section.key)}
            tabbable={row.stop === model.tabbable}
            depth={section.depth}
            actions={section.actions}
            onToggle={(next) => model.setCollapsed(section.key, next)}
            onActivate={model.activate}
            onNavigate={model.navigate}
          />
        </GridRow>
      );
    }
    const firstItem = flat[row.first];
    if (firstItem === undefined) return null;
    return (
      <GridRow key={`row-${getKey(firstItem, row.first)}`} at={at} row={row}>
        {flat.slice(row.first, row.first + row.size).map((item, offset) => (
          <GridCell
            key={getKey(item, row.first + offset)}
            index={row.stop + offset}
            column={offset}
            itemKey={getKey(item, row.first + offset)}
            tabbable={row.stop + offset === model.tabbable}
            onActivate={model.activate}
            onNavigate={model.navigate}
          >
            {renderItem(item, row.first + offset)}
          </GridCell>
        ))}
      </GridRow>
    );
  });
};

export { GridRows };
