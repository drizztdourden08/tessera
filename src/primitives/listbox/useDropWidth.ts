/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import { fitDropWidth } from './fit-drop-width';
import { naturalWidth } from './natural-width';
import type { UseDropWidthParams } from './drop-width.type';

const useDropWidth = (params: UseDropWidthParams): number | null => {
  const { open, dropRef, placement, contentKey } = params;
  const [width, setWidth] = useState<number | null>(null);
  const placed = placement !== null;
  const anchorWidth = placement?.anchorWidth;

  useLayoutEffect(() => {
    const drop = dropRef.current;
    if (!open || !drop || !placement) {
      setWidth(null);
      return;
    }
    const next = fitDropWidth(naturalWidth(drop), placement);
    setWidth((previous) => (previous === null ? next : Math.max(previous, next)));
  }, [open, placed, anchorWidth, contentKey]);

  return width;
};

export { useDropWidth };
