/* @layer renderer-components @kind component */
import { useLayoutEffect, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Overlay } from '../../../primitives/Overlay';
import { holeClip } from '../behavior/hole-clip';
import type { HoleRect } from '../behavior/tour-internal.type';
import type { TourSpotlightProps } from './TourSpotlight.type';

const ringStyle = (hole: HoleRect | null) =>
  (hole ? { transform: `translate(${hole.x}px, ${hole.y}px)`, inlineSize: hole.width, blockSize: hole.height } : undefined);

const TourSpotlight = (props: TourSpotlightProps) => {
  const { hole, view, ringRef } = props;
  const veilRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (veilRef.current) veilRef.current.style.clipPath = holeClip(hole, view);
  }, [hole, view]);

  return (
    <>
      <Overlay ref={veilRef} visible tone="scrim" blur className="guided-tour__veil" aria-hidden />
      <Box ref={ringRef} className={hole ? 'guided-tour__ring' : 'guided-tour__ring guided-tour__ring--off'} style={ringStyle(hole)} aria-hidden />
    </>
  );
};

export { TourSpotlight };
