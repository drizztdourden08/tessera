/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Floating } from '../../../primitives/Floating';
import { DropdownMenu } from '../../DropdownMenu';
import { usePointPlacement } from '../behavior/usePointPlacement';
import type { PointMenuProps } from '../ContextMenu.type';

const PointMenu = (props: PointMenuProps) => {
  const { point, menu, onClose } = props;
  const anchorRef = useRef<HTMLDivElement>(null);
  const { side, align } = usePointPlacement(point);

  return (
    <>
      <Floating ref={anchorRef} aria-hidden="true" placement={{ left: point.x, top: point.y }} />
      <DropdownMenu {...menu} anchorRef={anchorRef} side={side} align={align} onClose={onClose} />
    </>
  );
};

export { PointMenu };
