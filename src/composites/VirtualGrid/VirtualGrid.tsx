/* @layer renderer-components @kind component */
import { useImperativeHandle, useMemo } from 'react';
import { Box } from '../../primitives/Box';
import { mergeRefs } from '../../primitives/dom/merge-refs';
import { DragGhost } from '../DragGhost';
import { sizeVariable } from '../virtual/size-variable';
import { useVirtualGrid } from './behavior/useVirtualGrid';
import { GridRows } from './sub-components/GridRows';
import { COLUMNS_PROPERTY, HEADERS_PROPERTY, ROWS_PROPERTY, TILE_HEIGHT_PROPERTY, TILE_WIDTH_PROPERTY } from './VirtualGrid.constants';
import type { CSSProperties } from 'react';
import type { VirtualGridProps } from './VirtualGrid.type';
import '../../theme/virtual-box.css';
import '../../theme/visually-hidden.css';
import './VirtualGrid.css';

const VirtualGrid = <T,>(props: VirtualGridProps<T>) => {
  const { sections, getKey, renderItem, renderTile, label, tileSize = 'size-96', overscan, scrollRef, bind, overlay, ref, className } = props;
  const { tileWidth = tileSize, tileHeight = tileSize } = props;
  const model = useVirtualGrid({ ...props, overscan, sizeKey: `${tileWidth}-${tileHeight}` });
  const { columns, layout } = model;
  const rootRef = useMemo(() => mergeRefs(model.rootRef, scrollRef), [model.rootRef, scrollRef]);
  useImperativeHandle(ref, () => ({ scrollToIndex: model.scrollToIndex, getRects: model.getRects }), [model.scrollToIndex, model.getRects]);
  const rootStyle = { [TILE_WIDTH_PROPERTY]: sizeVariable(tileWidth), [TILE_HEIGHT_PROPERTY]: sizeVariable(tileHeight) } as CSSProperties;
  const bodyStyle = { [ROWS_PROPERTY]: layout.tileRows, [HEADERS_PROPERTY]: layout.headers, [COLUMNS_PROPERTY]: model.fixed ? columns : undefined } as CSSProperties;
  const classes = ['virtual-box', 'virtual-grid', className].filter(Boolean).join(' ');

  return (
    <Box ref={rootRef} className={classes} style={rootStyle} onScroll={model.onScroll} {...bind}>
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
        <GridRows model={model} sections={sections} getKey={getKey} renderItem={renderItem} renderTile={renderTile} />
      </Box>
      {overlay}
      {model.ghost && <DragGhost count={model.ghost.count} thumbnails={model.ghost.thumbnails} point={model.ghost.point} />}
      {model.announcing && <Box className="visually-hidden" aria-live="polite">{model.message}</Box>}
    </Box>
  );
};

export { VirtualGrid };
