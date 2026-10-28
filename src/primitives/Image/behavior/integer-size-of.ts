/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import type { ImageSize } from '../Image.type';
import { integerScale } from './integer-scale';

const integerSizeOf = (frame: ImageSize | null, natural: ImageSize | undefined): CSSProperties | undefined => {
  if (frame === null || natural === undefined) return undefined;
  const scale = integerScale(frame, natural);
  return { width: natural.width * scale, height: natural.height * scale };
};

export { integerSizeOf };
