/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import type { CanvasProps } from './Canvas.type';

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>((props, ref) => {
  return <canvas ref={ref} {...props} />;
});

export { Canvas };
