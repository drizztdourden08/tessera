/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { frameStyleOf } from './behavior/frame-style-of';
import { imageClass } from './behavior/image-class';
import { integerSizeOf } from './behavior/integer-size-of';
import { useFrameSize } from './behavior/useFrameSize';
import { useImageStatus } from './behavior/useImageStatus';
import { ImageCover } from './sub-components/ImageCover';
import type { ImageProps } from './Image.type';
import './Image.css';

const Image = (props: ImageProps) => {
  const {
    alt = '', aspectRatio, backdrop, className, fallback, fit, frame, onError, onLoad, pending = false, pixelated, placeholder = 'auto', style, ...rest
  } = props;
  const { src, srcSet, width, height } = rest;
  const { imgRef, hasSource, status, naturalRatio, natural, handleLoad, handleError } = useImageStatus({ src, srcSet, pending, onLoad, onError });
  const frameRef = useRef<HTMLSpanElement | null>(null);
  const frameSize = useFrameSize(fit === 'integer', frameRef);
  const frameClass = imageClass({ status, frame, fit, backdrop, pixelated, natural, className });
  const frameLabel = status === 'empty' && alt ? { role: 'img', 'aria-label': alt } : {};

  return (
    <span ref={frameRef} className={frameClass} style={frameStyleOf({ aspectRatio, width, height, naturalRatio, style })} {...frameLabel}>
      {hasSource ? (
        <img
          ref={imgRef}
          className="image__img"
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={integerSizeOf(frameSize, natural)}
          {...rest}
        />
      ) : null}
      {status === 'loaded' ? null : <ImageCover status={status} fallback={fallback} placeholder={placeholder} />}
    </span>
  );
};

export { Image };
