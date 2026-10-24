/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { gridColumns } from './grid-columns';
import type { GridColumnsInput } from './useGridColumns.type';

const useGridColumns = (input: GridColumnsInput): void => {
  const { rootRef, bodyRef, fallbackTile, refitKey, onColumns } = input;
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const fit = () => {
      const first = bodyRef.current?.firstElementChild;
      const tile = isHTMLElement(first) && first.offsetHeight > 0 ? first.offsetHeight : fallbackTile;
      onColumns(gridColumns(root.clientWidth, tile));
    };
    fit();
    return observeResize([root], fit);
  }, [rootRef, bodyRef, fallbackTile, refitKey, onColumns]);
};

export { useGridColumns };
