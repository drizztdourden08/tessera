/* @layer renderer-components @kind component */
import { useTesseraOverride } from '../../TesseraProvider/behavior/useTesseraOverride';
import { ImagePlaceholder } from './ImagePlaceholder';
import type { ImageCoverProps } from '../Image.type';

const ImageCover = (props: ImageCoverProps) => {
  const { fallback, placeholder, status } = props;
  const Placeholder = useTesseraOverride('imagePlaceholder') ?? ImagePlaceholder;
  const showsFallback = fallback !== undefined && status !== 'loading';
  if (showsFallback) return <span className="image__cover">{fallback}</span>;
  if (placeholder === 'none') return null;
  return (
    <span className="image__cover">
      <Placeholder status={status} />
    </span>
  );
};

export { ImageCover };
