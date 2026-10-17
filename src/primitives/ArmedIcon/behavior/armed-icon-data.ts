/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import { ARMED_ICON_STROKE, ARMED_ICON_THIN_STROKE, ARMED_ICONS } from '../ArmedIcon.constants';
import type { ArmedIconName, ArmedIconPart } from '../ArmedIcon.type';

const partBody = (part: ArmedIconPart): string => {
  const paths = part.d.map((d) => `<path d="${d}"/>`).join('');
  return part.thin ? `<g stroke-width="${ARMED_ICON_THIN_STROKE}">${paths}</g>` : paths;
};

const armedIconData = (name: ArmedIconName): IconifyIcon => {
  const parts = ARMED_ICONS[name].filter((part) => !part.armedOnly).map(partBody).join('');
  const look = `fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="${ARMED_ICON_STROKE}"`;
  return { body: `<g ${look}>${parts}</g>`, width: 24, height: 24 };
};

export { armedIconData };
