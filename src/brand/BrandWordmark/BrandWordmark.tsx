/* @layer renderer-components @kind component */
import { PixelWordmark } from '../PixelWordmark';
import { BRAND_FAMILY } from '../family.constants';
import type { BrandWordmarkProps } from './BrandWordmark.type';

const BrandWordmark = (props: BrandWordmarkProps) => {
  const { app, size, rim, title, className = '' } = props;
  const { name, wordmark } = BRAND_FAMILY[app];
  return (
    <PixelWordmark
      text={wordmark.text}
      colors={wordmark.colors}
      size={size}
      rim={rim}
      title={title ?? name}
      className={['brand-wordmark', className].filter(Boolean).join(' ')}
    />
  );
};

export { BrandWordmark };
