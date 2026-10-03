/* @layer renderer-components @kind component */
import { Icon as Iconify } from '@iconify/react/offline';
import { useTesseraOverride } from '../../TesseraProvider/behavior/useTesseraOverride';
import { iconDataFor } from '../behavior/icon-data-for';
import { iconLookProps } from '../behavior/icon-look-props';
import { ICONS } from '../Icon.constants';
import type { IconProps } from '../Icon.type';
import { IconEffectHost } from './IconEffectHost';

const IconBase = (props: IconProps) => {
  const { name: _name, icon: _icon, effect, ...look } = props;
  const set = useTesseraOverride('icons') ?? ICONS;
  const data = iconDataFor(props, set);
  if (effect) return <IconEffectHost icon={data} effect={effect} look={look} />;
  return <Iconify icon={data} {...iconLookProps(look)} />;
};

export { IconBase };
