/* @layer renderer-components @kind util */
import type { CSSProperties } from 'react';
import { DEFAULT_ASPECT_RATIO } from '../Image.constants';
import type { FrameStyleParams, ImageLength } from '../Image.type';

const lengthOf = (value: ImageLength): ImageLength => {
  const count = Number(value);
  return Number.isFinite(count) ? count : value;
};

const ratioOf = (width?: ImageLength, height?: ImageLength): string | undefined => {
  const across = Number(width);
  const down = Number(height);
  return across > 0 && down > 0 ? `${across} / ${down}` : undefined;
};

const sizeOf = (width?: ImageLength, height?: ImageLength): CSSProperties => {
  if (width !== undefined && width !== '') return { width: lengthOf(width) };
  if (height !== undefined && height !== '') return { width: 'auto', height: lengthOf(height) };
  return {};
};

const frameStyleOf = (params: FrameStyleParams): CSSProperties => {
  const { aspectRatio, height, naturalRatio, style, width } = params;
  const ratio = aspectRatio ?? ratioOf(width, height) ?? naturalRatio ?? DEFAULT_ASPECT_RATIO;
  return { aspectRatio: ratio, ...sizeOf(width, height), ...style };
};

export { frameStyleOf };
