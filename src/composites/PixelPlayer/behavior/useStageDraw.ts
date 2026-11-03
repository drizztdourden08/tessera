/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { drawRgba } from '../../../primitives/pixel-image/draw-rgba';
import type { StageDrawParams } from '../PixelPlayer.type';
import { drawOutline } from './draw-outline';

const useStageDraw = (params: StageDrawParams): void => {
  const { canvasRef, image, zoom, cell } = params;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    drawRgba(canvas, image, { width: image.width * zoom, height: image.height * zoom });
    if (cell) drawOutline(canvas, cell, zoom);
  }, [canvasRef, image, zoom, cell]);
};

export { useStageDraw };
