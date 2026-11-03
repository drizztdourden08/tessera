/* @layer renderer-components @kind component */
import { useEffect, useMemo, useRef } from 'react';
import { Canvas } from '../Canvas';
import { mergeRefs } from '../dom/merge-refs';
import { useInView } from '../dom/useInView';
import { drawRgba } from '../pixel-image/draw-rgba';
import { fitSize } from './behavior/fit-size';
import { thumbnailClass } from './behavior/thumbnail-class';
import { thumbnailNaming } from './behavior/thumbnail-naming';
import { useFrameClock } from './behavior/useFrameClock';
import { useThrottledValue } from './behavior/useThrottledValue';
import { useThumbnailSource } from './behavior/useThumbnailSource';
import { DEFAULT_BOX } from './PixelThumbnail.constants';
import type { PixelThumbnailProps } from './PixelThumbnail.type';
import './PixelThumbnail.css';

const PixelThumbnail = (props: PixelThumbnailProps) => {
  const {
    image = null, indexed, box = DEFAULT_BOX, fit = 'step', backdrop = 'checker', lazy = false, throttleMs = 0, frames, playing = false, label, ref, className,
  } = props;
  const frameRef = useRef<HTMLSpanElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const seen = useInView(frameRef, { once: true });
  const frameIndex = useFrameClock({ frames, playing, frameRef });
  const source = useThumbnailSource({ image, indexed, frames, frameIndex });
  const settled = useThrottledValue(source, throttleMs);
  const drawn = lazy && !seen ? null : settled;
  const canvasRefs = useMemo(() => mergeRefs(canvasRef, ref), [ref]);
  const size = useMemo(() => (drawn ? fitSize({ source: drawn, box, fit }) : { width: box, height: box }), [drawn, box, fit]);
  useEffect(() => drawRgba(canvasRef.current, drawn, size), [drawn, size]);
  const classes = thumbnailClass(backdrop, className);
  const naming = thumbnailNaming(label);

  return (
    <span ref={frameRef} className={classes} data-box={box}>
      <Canvas ref={canvasRefs} className="pixel-thumbnail__canvas" {...naming} />
    </span>
  );
};

export { PixelThumbnail };
