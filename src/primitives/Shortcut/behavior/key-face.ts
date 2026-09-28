/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../Shortcut.constants';
import type { CapWidth, KeyFace, KeyName, KeySpec, ShortcutLegend } from '../Shortcut.type';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const keyFace = (key: string, legend: ShortcutLegend, width?: CapWidth): KeyFace => {
  if (!isKeyName(key)) return { name: key.toUpperCase(), label: key.toUpperCase(), width: width ?? 'normal' };
  const spec: KeySpec = KEY_SPECS[key];
  const { name, label, symbol, arrow } = spec;
  const size = width ?? spec.width ?? 'normal';
  const icon = legend === 'arrow' ? arrow : symbol;
  if (legend !== 'label' && icon) return { name, symbol: icon, width: size };
  return label ? { name, label, width: size } : { name, symbol: symbol ?? arrow, width: size };
};

export { keyFace };
