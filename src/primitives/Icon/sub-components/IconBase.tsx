/* @layer renderer-components @kind component */
import { useContext } from 'react';
import { Icon as Iconify } from '@iconify/react/offline';
import '../../../theme/tag-hue.css';
import '../Icon.css';
import { useTesseraOverride } from '../../TesseraProvider/behavior/useTesseraOverride';
import { iconDataFor } from '../behavior/icon-data-for';
import { IconFitContext } from '../behavior/icon-fit-context';
import { iconHueClass } from '../behavior/icon-hue-class';
import { iconLookProps } from '../behavior/icon-look-props';
import { pixelIconLook } from '../behavior/pixel-icon-look';
import { isPixelIconName } from '../behavior/is-pixel-icon-name';
import { ICONS } from '../Icon.constants';
import type { IconProps } from '../Icon.type';
import { IconEffectHost } from './IconEffectHost';

const IconBase = (props: IconProps) => {
  const { name, icon: _icon, path, effect, hue, ...rest } = props;
  const own = hue === undefined ? rest : { ...rest, className: iconHueClass(hue, rest.className) };
  const set = useTesseraOverride('icons') ?? ICONS;
  const fit = useContext(IconFitContext);
  const data = iconDataFor(props, set);
  const flat = path === undefined ? own : { fill: 'currentColor', ...own };
  const look = isPixelIconName(name) ? pixelIconLook(flat) : flat;
  if (effect) return <IconEffectHost icon={data} effect={effect} look={look} fit={fit} />;
  return <Iconify icon={data} {...iconLookProps(look, fit)} />;
};

export { IconBase };
