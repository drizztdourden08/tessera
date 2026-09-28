/* @layer renderer-components @kind component */
import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { ImageProps } from './Image.type';

const Image = (props: ImageProps) => {
  const { alt = '', fallback, onError, src, ...rest } = props;
  const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);

  if (fallback !== undefined && src !== undefined && failedSrc === src) return <>{fallback}</>;

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (fallback !== undefined) setFailedSrc(src);
    onError?.(event);
  };

  return <img alt={alt} src={src} onError={handleError} {...rest} />;
};

export { Image };
