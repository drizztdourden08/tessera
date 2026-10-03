/* @layer renderer-components @kind logic */
import type { IconSamples } from '../sub-components/IconEffectHost.type';
import { ICON_SAMPLES } from './icon-samples-for.constants';

const iconSamplesFor = (icon: object, key: string, read: () => IconSamples | null): IconSamples | null => {
  const byKey = ICON_SAMPLES.get(icon) ?? new Map<string, IconSamples>();
  const known = byKey.get(key);
  if (known) return known;
  const fresh = read();
  if (!fresh) return null;
  byKey.set(key, fresh);
  ICON_SAMPLES.set(icon, byKey);
  return fresh;
};

export { iconSamplesFor };
