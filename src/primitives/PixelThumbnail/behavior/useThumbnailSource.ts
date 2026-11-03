/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { indexedRgba } from '../../pixel-image/indexed-rgba';
import type { RgbaImage } from '../../pixel-image/pixel-image.type';
import type { ThumbnailSourceParams } from '../PixelThumbnail.type';

const useThumbnailSource = (params: ThumbnailSourceParams): RgbaImage | null => {
  const { image, indexed, frames, frameIndex } = params;
  const converted = useMemo(() => (indexed ? indexedRgba(indexed) : null), [indexed]);
  if (frames) return frames[frameIndex]?.image ?? null;
  return image ?? converted;
};

export { useThumbnailSource };
