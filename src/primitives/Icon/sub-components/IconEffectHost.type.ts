/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { IconifyIcon } from '@iconify/types';
import type { IconEffect, IconEffectColor, IconEffectKind, IconLook } from '../Icon.type';

interface SamplePoint {
  x: number;
  y: number;
  shape: number;
}

interface SampleShape {
  length: number;
  pointAt: (share: number) => { x: number; y: number };
}

interface SampleSpan {
  shape: SampleShape;
  index: number;
  start: number;
}

interface IconSamples {
  viewBox: string;
  span: number;
  points: readonly SamplePoint[];
}

interface PopSpot {
  x: number;
  y: number;
  trail: string;
}

interface PopBeat {
  id: number;
  samples: IconSamples;
  spots: readonly PopSpot[];
}

interface ResolvedIconEffect {
  kind: IconEffectKind;
  every: number;
  jitter: number;
  color: IconEffectColor;
  count: number;
}

interface IconPopsParams {
  hostRef: RefObject<HTMLSpanElement | null>;
  icon: IconifyIcon;
  sampleKey: string;
  effect: ResolvedIconEffect;
}

interface PopTimers {
  setTimeout: (run: () => void, ms: number) => unknown;
  clearTimeout: (handle: never) => void;
}

interface PopSchedulerParams {
  every: number;
  jitter: number;
  onBeat: (id: number) => void;
  random?: () => number;
  timers?: PopTimers;
}

interface IconEffectHostProps {
  icon: IconifyIcon;
  effect: IconEffect;
  look: IconLook;
}

interface IconEffectPopProps {
  kind: IconEffectKind;
  spot: PopSpot;
  scale: number;
}

export type {
  IconEffectHostProps, IconEffectPopProps, IconPopsParams, IconSamples, PopBeat, PopSpot,
  PopSchedulerParams, ResolvedIconEffect, SamplePoint, SampleShape, SampleSpan,
};
