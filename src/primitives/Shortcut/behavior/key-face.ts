/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../Shortcut.constants';
import type { KeyFace, KeyName, KeySpec, ShortcutLegend } from '../Shortcut.type';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const keyFace = (key: string, legend: ShortcutLegend): KeyFace => {
  if (!isKeyName(key)) return { name: key.toUpperCase(), label: key.toUpperCase(), width: 'unit' };
  const spec: KeySpec = KEY_SPECS[key];
  const { name, label, symbol, width = 'unit' } = spec;
  const showSymbol = symbol !== undefined && (legend === 'symbol' || label === undefined);
  return showSymbol ? { name, symbol, width } : { name, label, width };
};

export { keyFace };
