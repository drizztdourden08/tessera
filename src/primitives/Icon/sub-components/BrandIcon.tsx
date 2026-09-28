/* @layer renderer-components @kind component */
import { brandIconData } from '../behavior/brandIconData';
import { IconBase } from '../IconBase';
import type { BrandIconProps } from '../Icon.type';

const BrandIcon = (props: BrandIconProps) => {
  const { name, tone = 'color', ...look } = props;
  return <IconBase icon={brandIconData(name, tone)} {...look} />;
};

export { BrandIcon };
