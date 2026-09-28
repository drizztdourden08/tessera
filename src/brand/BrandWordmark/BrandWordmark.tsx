/* @layer renderer-components @kind component */
import { PixelWordmark } from '../../composites/PixelWordmark';
import { BRAND_FAMILY } from '../family.constants';
import type { BrandWordmarkProps } from './BrandWordmark.type';

const BrandWordmark = (props: BrandWordmarkProps) => {
  const { app, size, title, className = '' } = props;
  const { name, wordmark } = BRAND_FAMILY[app];
  return (
    <PixelWordmark
      text={wordmark.text}
      colors={wordmark.colors}
      size={size}
      title={title ?? name}
      className={['brand-wordmark', className].filter(Boolean).join(' ')}
    />
  );
};

export { BrandWordmark };
