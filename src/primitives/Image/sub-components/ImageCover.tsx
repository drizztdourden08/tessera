/* @layer renderer-components @kind component */
import { ImagePlaceholder } from './ImagePlaceholder';
import type { ImageCoverProps } from '../Image.type';

const ImageCover = (props: ImageCoverProps) => {
  const { fallback, placeholder, status } = props;
  const showsFallback = fallback !== undefined && status !== 'loading';
  if (showsFallback) return <span className="image__cover">{fallback}</span>;
  if (placeholder === 'none') return null;
  return (
    <span className="image__cover">
      <ImagePlaceholder status={status} />
    </span>
  );
};

export { ImageCover };
