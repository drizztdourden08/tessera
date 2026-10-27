/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Image } from '../../../primitives/Image';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { imageSource } from '../behavior/image-source';
import { useMarkdownSettings } from '../behavior/useMarkdownSettings';
import type { MarkdownImageProps } from '../Markdown.type';

const MarkdownImage = ({ alt, src }: MarkdownImageProps) => {
  const { images, onImage } = useMarkdownSettings();
  const [width, setWidth] = useState<number | undefined>(undefined);
  const source = imageSource(src, images);
  if (!source) return alt ? <Span className="markdown__image-text">{alt}</Span> : null;
  const picture = (
    <Image
      className="markdown__image"
      src={source}
      alt={alt ?? ''}
      width={width}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onLoad={(event) => setWidth(event.currentTarget.naturalWidth || undefined)}
    />
  );
  if (!onImage) return picture;
  return (
    <Pressable className="markdown__image-button" aria-label={alt === '' ? undefined : alt} onClick={() => onImage({ src: source, alt: alt ?? '' })}>
      {picture}
    </Pressable>
  );
};

export { MarkdownImage };
