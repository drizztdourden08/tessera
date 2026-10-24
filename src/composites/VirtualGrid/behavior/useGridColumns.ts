/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { TILE_SELECTOR } from '../VirtualGrid.constants';
import { gridColumns } from './grid-columns';
import type { GridColumnsInput } from './useGridColumns.type';

const useGridColumns = (input: GridColumnsInput): void => {
  const { rootRef, bodyRef, fallbackTile, refitKey, onColumns } = input;
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const fit = () => {
      const first = bodyRef.current?.querySelector(TILE_SELECTOR);
      const tile = isHTMLElement(first) && first.offsetWidth > 0 ? first.offsetWidth : fallbackTile;
      onColumns(gridColumns(root.clientWidth, tile));
    };
    fit();
    return observeResize([root], fit);
  }, [rootRef, bodyRef, fallbackTile, refitKey, onColumns]);
};

export { useGridColumns };
