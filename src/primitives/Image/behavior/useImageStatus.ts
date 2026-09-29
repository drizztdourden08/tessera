/* @layer renderer-components @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import type { SyntheticEvent } from 'react';
import { imageStatusOf } from './image-status-of';
import { settledImageOf } from './settled-image-of';
import type { SettledImage, UseImageStatusParams } from '../Image.type';

const useImageStatus = (params: UseImageStatusParams) => {
  const { src, srcSet, pending, onLoad, onError } = params;
  const source = [src, srcSet].find(Boolean) ?? '';
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [settled, setSettled] = useState<SettledImage | null>(null);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (source && img?.complete) setSettled(settledImageOf(source, img, img.naturalWidth > 0));
  }, [source]);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setSettled(settledImageOf(source, event.currentTarget, true));
    onLoad?.(event);
  };

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    setSettled(settledImageOf(source, event.currentTarget, false));
    onError?.(event);
  };

  const current = settled?.source === source ? settled : null;
  const status = imageStatusOf(source, pending, current);

  return { imgRef, hasSource: source !== '', status, naturalRatio: current?.ratio, handleLoad, handleError };
};

export { useImageStatus };
