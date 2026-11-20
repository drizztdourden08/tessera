/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../Shortcut.constants';
import type { CapWidth, KeyFace, KeyName, KeySpec, KeysStrings, ShortcutLegend } from '../Shortcut.type';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const capLabel = (key: KeyName, spec: KeySpec, names: KeysStrings): string | undefined => (spec.label ? names[`${key}Label` as keyof KeysStrings] : undefined);

const keyFace = (key: string, legend: ShortcutLegend, names: KeysStrings, width?: CapWidth): KeyFace => {
  if (!isKeyName(key)) return { name: key.toUpperCase(), label: key.toUpperCase(), width: width ?? 'normal' };
  const spec: KeySpec = KEY_SPECS[key];
  const { symbol, arrow } = spec;
  const name = names[key];
  const label = capLabel(key, spec, names);
  const size = width ?? spec.width ?? 'normal';
  const icon = legend === 'arrow' ? arrow : symbol;
  if (legend !== 'label' && icon) return { name, symbol: icon, width: size };
  return label ? { name, label, width: size } : { name, symbol: symbol ?? arrow, width: size };
};

export { keyFace };
