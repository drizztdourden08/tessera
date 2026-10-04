/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Floating } from '../../../primitives/Floating';
import type { BesideFrame } from '../../DockLayout/behavior/beside-pointer.type';
import { useBesidePointer } from '../../DockLayout/behavior/useBesidePointer';
import type { WindowGuideBesideProps } from '../WindowGuideOverlay.type';

const overlayFrame = (box: HTMLElement): BesideFrame => {
  const overlay = box.parentElement ?? box;
  const at = overlay.getBoundingClientRect();
  return { area: { x: 0, y: 0, width: overlay.clientWidth, height: overlay.clientHeight }, origin: { x: at.left, y: at.top } };
};

const WindowGuideBeside = (props: WindowGuideBesideProps) => {
  const { pointer, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  const place = useBesidePointer(ref, pointer, overlayFrame);
  return (
    <Floating ref={ref} className="window-guide__beside" placement={place} aria-hidden>
      {children}
    </Floating>
  );
};

export { WindowGuideBeside };
