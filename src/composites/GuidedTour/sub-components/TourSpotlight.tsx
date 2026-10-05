/* @layer renderer-components @kind component */
import { useCallback, useLayoutEffect, useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Overlay } from '../../../primitives/Overlay';
import { holeClip } from '../behavior/hole-clip';
import { useTopLayer } from '../behavior/useTopLayer';
import type { HoleRect } from '../behavior/tour-internal.type';
import type { TourSpotlightProps } from './TourSpotlight.type';
import './TourSpotlight.css';

const ringStyle = (hole: HoleRect | null) =>
  (hole ? { transform: `translate(${hole.x}px, ${hole.y}px)`, inlineSize: hole.width, blockSize: hole.height } : undefined);

const TourSpotlight = (props: TourSpotlightProps) => {
  const { hole, kept, view, ringRef } = props.spot;
  const veilRef = useRef<HTMLElement>(null);
  const layerRef = useTopLayer<HTMLElement>();
  const attach = useCallback((node: HTMLElement | null) => {
    layerRef.current = node;
    ringRef.current = node;
  }, [layerRef, ringRef]);

  useLayoutEffect(() => {
    if (veilRef.current) veilRef.current.style.clipPath = holeClip(hole, view, kept);
  }, [hole, view, kept]);

  return (
    <>
      <Overlay ref={veilRef} visible tone="scrim" blur className="tour-spotlight__veil" aria-hidden />
      <Box ref={attach} popover="manual" className={hole ? 'tour-spotlight__ring' : 'tour-spotlight__ring tour-spotlight__ring--off'} style={ringStyle(hole)} aria-hidden />
    </>
  );
};

export { TourSpotlight };
