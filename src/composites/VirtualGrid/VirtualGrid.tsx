/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { sizeVariable } from '../virtual/size-variable';
import { useVirtualGrid } from './behavior/useVirtualGrid';
import { GridCell } from './sub-components/GridCell';
import { GridRow } from './sub-components/GridRow';
import { ROWS_PROPERTY, TILE_PROPERTY } from './VirtualGrid.constants';
import type { CSSProperties } from 'react';
import type { VirtualGridProps } from './VirtualGrid.type';
import '../../theme/virtual-box.css';
import './VirtualGrid.css';

const VirtualGrid = <T,>(props: VirtualGridProps<T>) => {
  const { items, getKey, renderItem, label, tileSize = 'size-96', overscan, onActiveChange, className } = props;
  const model = useVirtualGrid({ items, getKey, overscan, onActiveChange, sizeKey: tileSize });
  const { columns } = model;
  const rootStyle = { [TILE_PROPERTY]: sizeVariable(tileSize) } as CSSProperties;
  const bodyStyle = { [ROWS_PROPERTY]: model.rowCount } as CSSProperties;
  const classes = ['virtual-box', 'virtual-grid', className].filter(Boolean).join(' ');

  return (
    <Box ref={model.rootRef} className={classes} style={rootStyle} onScroll={model.onScroll}>
      <Box
        ref={model.bodyRef}
        role="grid"
        aria-label={label}
        aria-rowcount={model.rowCount}
        aria-colcount={columns}
        className="virtual-grid__body"
        style={bodyStyle}
        onFocus={model.onFocus}
        onBlur={model.onBlur}
      >
        {model.rows.map((row) => {
          const first = row * columns;
          const firstItem = items[first];
          if (firstItem === undefined) return null;
          return (
            <GridRow key={`row-${getKey(firstItem, first)}`} row={row}>
              {items.slice(first, first + columns).map((item, offset) => (
                <GridCell
                  key={getKey(item, first + offset)}
                  index={first + offset}
                  column={offset}
                  tabbable={first + offset === model.tabbable}
                  onActivate={model.activate}
                  onNavigate={model.navigate}
                >
                  {renderItem(item, first + offset)}
                </GridCell>
              ))}
            </GridRow>
          );
        })}
      </Box>
    </Box>
  );
};

export { VirtualGrid };
