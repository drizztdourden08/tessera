/* @layer renderer-components @kind types */
import type { HTMLAttributes, ReactNode } from 'react';
import type { IconName } from '../Icon/Icon.type';

type StatusTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | 'tertiary';

type StatusVariant = 'text' | 'pill';

type StatusSize = 'sm' | 'md';

interface StatusDef {
  label: string;
  tone: StatusTone;
  pulse?: boolean;
  icon?: IconName;
}

type StatusMap<Key extends string = string> = Readonly<Record<Key, StatusDef>>;

type StatusKey<Map extends StatusMap> = Extract<keyof Map, string>;

interface StatusLook extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusVariant;
  size?: StatusSize;
  dot?: boolean;
}

interface StatusWordProps extends StatusLook {
  tone?: StatusTone;
  pulse?: boolean;
  children: ReactNode;
  map?: never;
  value?: never;
  fallback?: never;
}

interface StatusMapProps<Map extends StatusMap> extends StatusLook {
  map: Map;
  value: StatusKey<Map> | null | undefined;
  fallback?: StatusKey<Map>;
  tone?: never;
  pulse?: never;
  children?: never;
}

type StatusProps<Map extends StatusMap = StatusMap> = StatusWordProps | StatusMapProps<Map>;

interface StatusClassLook {
  variant: StatusVariant;
  size: StatusSize;
  withDot: boolean;
}

interface DrawnStatus {
  tone: StatusTone;
  pulse: boolean;
  label: ReactNode;
  icon?: IconName;
  key?: string;
}

export type { DrawnStatus, StatusClassLook, StatusDef, StatusKey, StatusMap, StatusMapProps, StatusProps, StatusTone, StatusVariant };
