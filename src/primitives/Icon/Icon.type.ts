/* @layer renderer-components @kind types */
import type { SVGProps } from 'react';
import type { IconifyIcon } from '@iconify/types';
import type { BrandApp } from '../../brand/brand.type';
import type { ICONS } from './Icon.constants';

type IconName = keyof typeof ICONS;

type IconRotation = 0 | 90 | 180 | 270;

type IconFlip = 'horizontal' | 'vertical' | 'both';

type BrandIconName = BrandApp | 'rotp-mascot';

type BrandIconTone = 'color' | 'mono';

interface IconLook extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'rotate' | 'name' | 'mode' | 'onLoad'> {
  size?: number | string;
  rotate?: IconRotation;
  flip?: IconFlip;
  inline?: boolean;
  label?: string;
}

type IconSource = { name: IconName; icon?: never } | { icon: IconifyIcon; name?: never };

type IconProps = IconLook & IconSource;

interface BrandIconProps extends IconLook {
  name: BrandIconName;
  tone?: BrandIconTone;
}

export type { BrandIconName, BrandIconProps, BrandIconTone, IconFlip, IconLook, IconName, IconProps, IconRotation, IconSource };
