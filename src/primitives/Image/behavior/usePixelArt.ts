/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { PixelArt } from '../Image.type';
import { isPixelArt } from './is-pixel-art';

const usePixelArt = (): PixelArt => {
  const [pixelArt, setPixelArt] = useState(false);
  const onLoad = useCallback((event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
    setPixelArt(isPixelArt({ width, height }));
  }, []);
  return { pixelArt, onLoad };
};

export { usePixelArt };
