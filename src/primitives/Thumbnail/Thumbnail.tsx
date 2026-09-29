/* @layer renderer-components @kind component */
import { Image } from '../Image';
import type { ThumbnailProps } from './Thumbnail.type';
import './Thumbnail.css';

const Thumbnail = (props: ThumbnailProps) => {
  const { src, placeholder, className, ...rest } = props;

  return (
    <Image
      className={className ? `thumbnail ${className}` : 'thumbnail'}
      src={src ?? undefined}
      fallback={src ? undefined : placeholder}
      {...rest}
    />
  );
};

export { Thumbnail };
