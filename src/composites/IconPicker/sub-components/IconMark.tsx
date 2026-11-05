/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Image } from '../../../primitives/Image';
import { svgDataUrl } from '../behavior/svg-data-url';
import type { IconMarkProps } from './IconMark.type';

const IconMark = ({ value }: IconMarkProps) => {
  if (value.kind === 'icon') return <Icon name={value.name} />;
  const src = value.kind === 'svg' ? svgDataUrl(value.svg) : value.dataUrl;
  return <Image className="icon-picker__image" src={src} alt="" fit="contain" placeholder="none" />;
};

export { IconMark };
