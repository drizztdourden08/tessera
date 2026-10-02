/* @layer renderer-components @kind types */
import type { ComponentProps } from 'react';
import type Saturation from '#react-color/Saturation';
import type Hue from '#react-color/Hue';
import type Alpha from '#react-color/Alpha';
import type { InjectedColorProps } from 'react-color';

interface HsvColor { h: number; s: number; v: number; a?: number }

interface WheelFields {
  hsl?: InjectedColorProps['hsl'];
  hsv?: HsvColor;
  rgb?: InjectedColorProps['rgb'];
  radius?: string;
  shadow?: string;
}

type SaturationProps = ComponentProps<typeof Saturation> & WheelFields;
type HueProps = ComponentProps<typeof Hue> & WheelFields;
type AlphaProps = ComponentProps<typeof Alpha> & WheelFields;

interface WheelProps extends InjectedColorProps {
  disableAlpha?: boolean;
  hsv?: HsvColor;
}

export type { AlphaProps, HueProps, SaturationProps, WheelProps };
