/* @layer renderer-components @kind util */
import { KEY_SPECS } from '../Keyboard.constants';
import type { KeyFace, KeyName, KeySpec, ResolvedPlatform } from '../Keyboard.type';

const isKeyName = (key: string): key is KeyName => Object.hasOwn(KEY_SPECS, key);

const keyFace = (key: string, platform: ResolvedPlatform): KeyFace => {
  if (!isKeyName(key)) return { name: key.toUpperCase(), word: key.toUpperCase(), width: 'unit' };
  const spec: KeySpec = KEY_SPECS[key];
  const width = spec.width ?? 'unit';
  if (platform !== 'mac' || !spec.mac) return { name: spec.name, word: spec.word, symbol: spec.symbol, width };
  const { name = spec.name, word, symbol } = spec.mac;
  return { name, word, symbol, width };
};

export { keyFace };
