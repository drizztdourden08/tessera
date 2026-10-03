/* @layer renderer-components @kind logic */
import type { IconifyIcon } from '@iconify/types';
import { INPUT_ICON_GRID, INPUT_ICONS } from '../InputIcon.constants';
import type { InputIconEntry, InputIconSource } from '../InputIcon.type';
import { INPUT_ICON_DATA } from './input-icon-data.constants';

const toIcon = (entry: InputIconEntry): IconifyIcon =>
  (typeof entry === 'string' ? { body: entry, width: INPUT_ICON_GRID, height: INPUT_ICON_GRID } : { ...entry });

const inputIconData = (source: InputIconSource): IconifyIcon | null => {
  const key = `${source.family}/${source.name}`;
  const known = INPUT_ICON_DATA.get(key);
  if (known) return known;
  const set: Readonly<Record<string, InputIconEntry>> = INPUT_ICONS[source.family];
  const entry = Object.hasOwn(set, source.name) ? set[source.name] : undefined;
  if (entry === undefined) return null;
  const icon = toIcon(entry);
  INPUT_ICON_DATA.set(key, icon);
  return icon;
};

export { inputIconData };
