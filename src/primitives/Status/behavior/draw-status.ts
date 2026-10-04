/* @layer renderer-components @kind util */
import type { DrawnStatus, StatusMap, StatusMapProps, StatusProps } from '../Status.type';

const isMapped = <Map extends StatusMap>(props: StatusProps<Map>): props is StatusMapProps<Map> => props.map !== undefined;

const fromMap = <Map extends StatusMap>(props: StatusMapProps<Map>): DrawnStatus | null => {
  const { map, value, fallback } = props;
  const key = value != null && Object.hasOwn(map, value) ? value : fallback;
  const def = key === undefined ? undefined : map[key];
  return def ? { tone: def.tone, pulse: def.pulse ?? false, label: def.label, icon: def.icon, key } : null;
};

const drawStatus = <Map extends StatusMap>(props: StatusProps<Map>): DrawnStatus | null => {
  if (isMapped(props)) return fromMap(props);
  return { tone: props.tone ?? 'neutral', pulse: props.pulse ?? false, label: props.children };
};

export { drawStatus };
