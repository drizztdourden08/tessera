/* @layer renderer-components @kind component */
import { useImperativeHandle, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { mergeRefs } from '../../primitives/dom/merge-refs';
import { DragGhost } from '../DragGhost';
import { gridTotal } from './behavior/grid-total';
import { tileSpan } from './behavior/tile-span';
import { useVirtualGrid } from './behavior/useVirtualGrid';
import { GridRows } from './sub-components/GridRows';
import { COLUMNS_PROPERTY, HEADERS_PROPERTY, ROWS_PROPERTY, TILE_HEIGHT_PROPERTY, TILE_WIDTH_PROPERTY, TOTAL_PROPERTY } from './VirtualGrid.constants';
import type { CSSProperties } from 'react';
import type { VirtualGridProps } from './VirtualGrid.type';
import '../../theme/virtual-box.css';
import '../../theme/visually-hidden.css';
import './VirtualGrid.css';

const VirtualGrid = <T,>(props: VirtualGridProps<T>) => {
  const { sections, getKey, renderItem, renderTile, tileProps, trailing, label, tileSize = 'size-96', density, overscan, scrollRef, bind, overlay, ref, className } = props;
  const { tileWidth = tileSize, tileHeight = tileSize } = props;
  const model = useVirtualGrid({ ...props, overscan, sizeKey: `${tileWidth}-${tileHeight}-${String(density)}` });
  const { columns, layout } = model;
  const rootRef = useMemo(() => mergeRefs(model.rootRef, scrollRef), [model.rootRef, scrollRef]);
  useImperativeHandle(ref, () => ({ scrollToIndex: model.scrollToIndex, getRects: model.getRects }), [model.scrollToIndex, model.getRects]);
  const rootStyle = { [TILE_WIDTH_PROPERTY]: tileSpan(tileWidth, density), [TILE_HEIGHT_PROPERTY]: tileSpan(tileHeight, density) } as CSSProperties;
  const bodyStyle = {
    [ROWS_PROPERTY]: layout.tileRows,
    [HEADERS_PROPERTY]: layout.headers,
    [COLUMNS_PROPERTY]: model.fixed ? columns : undefined,
    [TOTAL_PROPERTY]: model.measured ? `${gridTotal(layout, model.heights)}px` : undefined,
  } as CSSProperties;
  const classes = ['virtual-box', 'virtual-grid', model.measured && 'virtual-grid--measured', className].filter(Boolean).join(' ');

  return (
    <Box ref={rootRef} className={classes} style={rootStyle} data-density={density} onScroll={model.onScroll} {...bind}>
      <Box
        ref={model.bodyRef}
        role="grid"
        aria-label={label}
        aria-rowcount={layout.rows.length}
        aria-colcount={columns}
        aria-multiselectable={model.selecting ? true : undefined}
        className="virtual-grid__body"
        style={bodyStyle}
        onFocus={model.onFocus}
        onBlur={model.onBlur}
      >
        <GridRows model={model} sections={sections} getKey={getKey} renderItem={renderItem} renderTile={renderTile} tileProps={tileProps} trailing={trailing} density={density} />
      </Box>
      {overlay}
      {model.ghost && <DragGhost count={model.ghost.count} thumbnails={model.ghost.thumbnails} point={model.ghost.point} />}
      {model.announcing && <Box className="visually-hidden" aria-live="polite">{model.message}</Box>}
    </Box>
  );
};

export { VirtualGrid };
