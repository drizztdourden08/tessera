/* @layer renderer-components @kind types */
import type { IconName } from '../Icon/Icon.type';
import type { StatusProps, StatusTone } from '../Status/Status.type';

interface StatusDef {
  label: string;
  tone: StatusTone;
  pulse?: boolean;
  icon?: IconName;
}

type StatusMap<Key extends string = string> = Readonly<Record<Key, StatusDef>>;

type StatusKey<Map extends StatusMap> = Extract<keyof Map, string>;

interface StatusOfProps<Map extends StatusMap> extends Omit<StatusProps, 'tone' | 'pulse' | 'children'> {
  map: Map;
  value: StatusKey<Map> | null | undefined;
  fallback?: StatusKey<Map>;
}

export type { StatusDef, StatusKey, StatusMap, StatusOfProps };
