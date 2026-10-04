/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import type { FloatingPlacement } from '../../Floating/Floating.type';
import type { TooltipProps } from '../Tooltip.type';

const useFallbackPos = (
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  placement: NonNullable<TooltipProps['placement']>,
): FloatingPlacement | null => {
  const [pos, setPos] = useState<FloatingPlacement | null>(null);
  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ left: r.left + r.width / 2, top: placement === 'top' ? r.top : r.bottom });
  }, [anchorRef, open, placement]);
  return pos;
};

export { useFallbackPos };
