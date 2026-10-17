/* @layer renderer-components @kind component */
import { usePixelArt } from '../../../primitives/Image/behavior/usePixelArt';
import { ImageElement } from '../../../primitives/media/ImageElement';
import type { SplashWordmarkProps } from './SplashWordmark.type';

const SplashWordmark = (props: SplashWordmarkProps) => {
  const { src, alt, pixelated } = props;
  const { pixelArt, onLoad } = usePixelArt();
  const sharp = pixelated === 'auto' ? pixelArt : pixelated;
  return (
    <ImageElement
      className={sharp ? 'ts-wordmark ts-wordmark--pixelated' : 'ts-wordmark'}
      src={src}
      alt={alt}
      onLoad={pixelated === 'auto' ? onLoad : undefined}
    />
  );
};

export { SplashWordmark };
