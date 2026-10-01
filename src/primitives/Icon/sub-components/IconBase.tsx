/* @layer renderer-components @kind component */
import { Icon as Iconify } from '@iconify/react/offline';
import { useTesseraOverride } from '../../TesseraProvider/behavior/useTesseraOverride';
import { iconDataFor } from '../behavior/icon-data-for';
import { iconLookProps } from '../behavior/icon-look-props';
import { ICONS } from '../Icon.constants';
import type { IconProps } from '../Icon.type';

const IconBase = (props: IconProps) => {
  const { name: _name, icon: _icon, ...look } = props;
  const set = useTesseraOverride('icons') ?? ICONS;
  return <Iconify icon={iconDataFor(props, set)} {...iconLookProps(look)} />;
};

export { IconBase };
