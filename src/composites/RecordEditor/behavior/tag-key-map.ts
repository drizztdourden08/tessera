/* @layer renderer-components @kind logic */
import type { IdRefOption } from '../../field-kits/registry.type';
import type { TagKeyMap } from './tag-key-map.type';

const buildTagKeyMap = (options: readonly IdRefOption[]): TagKeyMap => {
  const keys = new Map<string, string>();
  const ids = new Map<string, string>();
  for (const option of options) {
    keys.set(option.value, option.label);
    ids.set(option.label, option.value);
  }
  return {
    keyOfId: (id) => keys.get(id) ?? id,
    idOfKey: (key) => ids.get(key),
  };
};

export { buildTagKeyMap };
