/* @layer renderer-components @kind component */
import { Icon as Iconify } from '@iconify/react/offline';
import { iconDataFor } from '../behavior/icon-data-for';
import { iconLookProps } from '../behavior/icon-look-props';
import type { IconProps } from '../Icon.type';

const IconBase = (props: IconProps) => {
  const { name: _name, icon: _icon, ...look } = props;
  return <Iconify icon={iconDataFor(props)} {...iconLookProps(look)} />;
};

export { IconBase };
