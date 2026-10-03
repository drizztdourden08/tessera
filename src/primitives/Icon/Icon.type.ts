/* @layer renderer-components @kind types */
import type { SVGProps } from 'react';
import type { IconifyIcon } from '@iconify/types';
import type { BrandApp } from '../../brand/brand.type';
import type { ICONS } from './Icon.constants';

type IconName = keyof typeof ICONS;

type IconSet = Readonly<Record<IconName, IconifyIcon>>;

type IconRotation = 0 | 90 | 180 | 270;

type IconFlip = 'horizontal' | 'vertical' | 'both';

type BrandIconName = BrandApp | 'rotp-mascot';

type BrandIconTone = 'color' | 'mono';

type IconEffectKind = 'twinkle' | 'glint' | 'ping' | 'burst' | 'dot' | 'comet' | 'shimmer';

type IconEffectSize = 'sm' | 'md' | 'lg';

type IconEffectColor = 'current' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'info';

interface IconEffectOptions {
  kind: IconEffectKind;
  every?: number;
  jitter?: number;
  color?: IconEffectColor;
  count?: number;
  size?: IconEffectSize;
}

type IconEffect = IconEffectKind | IconEffectOptions;

interface IconLook extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'rotate' | 'name' | 'mode' | 'onLoad'> {
  size?: number | string;
  rotate?: IconRotation;
  flip?: IconFlip;
  inline?: boolean;
  label?: string;
  effect?: IconEffect;
}

type IconSource = { name: IconName; icon?: never } | { icon: IconifyIcon; name?: never };

type IconProps = IconLook & IconSource;

interface BrandIconProps extends IconLook {
  name: BrandIconName;
  tone?: BrandIconTone;
}

export type {
  BrandIconName, BrandIconProps, BrandIconTone, IconEffect, IconEffectColor, IconEffectKind, IconEffectOptions, IconEffectSize,
  IconFlip, IconLook, IconName, IconProps, IconRotation, IconSet, IconSource,
};
