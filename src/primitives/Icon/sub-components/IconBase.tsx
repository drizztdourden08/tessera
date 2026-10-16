/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Icon as Iconify } from '@iconify/react/offline';
import { useTesseraOverride } from '../../TesseraProvider/behavior/useTesseraOverride';
import { iconDataFor } from '../behavior/icon-data-for';
import { IconFitContext } from '../behavior/icon-fit-context';
import { iconLookProps } from '../behavior/icon-look-props';
import { ICONS } from '../Icon.constants';
import type { IconProps } from '../Icon.type';
import { IconEffectHost } from './IconEffectHost';

const IconBase = (props: IconProps) => {
  const { name: _name, icon: _icon, path, effect, ...own } = props;
  const set = useTesseraOverride('icons') ?? ICONS;
  const fit = useContext(IconFitContext);
  const data = iconDataFor(props, set);
  const look = path === undefined ? own : { fill: 'currentColor', ...own };
  if (effect) return <IconEffectHost icon={data} effect={effect} look={look} fit={fit} />;
  return <Iconify icon={data} {...iconLookProps(look, fit)} />;
};

export { IconBase };
