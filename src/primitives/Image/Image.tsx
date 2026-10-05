/* @layer renderer-components @kind component */
import { frameStyleOf } from './behavior/frame-style-of';
import { useImageStatus } from './behavior/useImageStatus';
import { ImageCover } from './sub-components/ImageCover';
import type { ImageProps } from './Image.type';
import './Image.css';

const Image = (props: ImageProps) => {
  const { alt = '', aspectRatio, className, fallback, frame = false, onError, onLoad, pending = false, placeholder = 'auto', style, ...rest } = props;
  const { src, srcSet, width, height } = rest;
  const { imgRef, hasSource, status, naturalRatio, handleLoad, handleError } = useImageStatus({ src, srcSet, pending, onLoad, onError });
  const frameClass = ['image', `image--${status}`, frame && 'image--framed', className].filter(Boolean).join(' ');
  const frameLabel = status === 'empty' && alt ? { role: 'img', 'aria-label': alt } : {};

  return (
    <span className={frameClass} style={frameStyleOf({ aspectRatio, width, height, naturalRatio, style })} {...frameLabel}>
      {hasSource ? (
        <img ref={imgRef} className="image__img" alt={alt} onLoad={handleLoad} onError={handleError} {...rest} />
      ) : null}
      {status === 'loaded' ? null : <ImageCover status={status} fallback={fallback} placeholder={placeholder} />}
    </span>
  );
};

export { Image };
