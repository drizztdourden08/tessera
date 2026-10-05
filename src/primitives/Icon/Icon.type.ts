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

interface IconLook extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'rotate' | 'name' | 'mode' | 'onLoad' | 'path'> {
  size?: number | string;
  rotate?: IconRotation;
  flip?: IconFlip;
  inline?: boolean;
  label?: string;
  effect?: IconEffect;
}

interface IconPathCircle {
  cx: number;
  cy: number;
  r: number;
}

interface IconPath {
  d?: string | readonly string[];
  circles?: readonly IconPathCircle[];
  viewBox?: string;
}

type IconSource =
  | { name: IconName; icon?: never; path?: never }
  | { icon: IconifyIcon; name?: never; path?: never }
  | { path: IconPath; name?: never; icon?: never };

type IconProps = IconLook & IconSource;

interface BrandIconProps extends IconLook {
  name: BrandIconName;
  tone?: BrandIconTone;
}

export type {
  BrandIconName, BrandIconProps, BrandIconTone, IconEffect, IconEffectColor, IconEffectKind, IconEffectOptions, IconEffectSize,
  IconFlip, IconLook, IconName, IconPath, IconPathCircle, IconProps, IconRotation, IconSet, IconSource,
};
