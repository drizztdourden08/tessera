/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { keysToDepth } from './keys-to-depth';
import type { TreeExpansion, TreeExpansionInput } from './useTreeExpansion.type';

const useTreeExpansion = <T,>(input: TreeExpansionInput<T>): TreeExpansion => {
  const { root, expandToDepth, expandedKeys, onExpandedChange } = input;
  const [localKeys, setLocalKeys] = useState<readonly string[]>(() => keysToDepth(root, expandToDepth));
  const keys = expandedKeys ?? localKeys;
  const open = useMemo(() => new Set(keys), [keys]);

  const setExpanded = useCallback((key: string, expanded: boolean) => {
    if (open.has(key) === expanded) return;
    const next = expanded ? [...keys, key] : keys.filter((k) => k !== key);
    if (expandedKeys === undefined) setLocalKeys(next);
    onExpandedChange?.(next);
  }, [open, keys, expandedKeys, onExpandedChange]);

  const toggle = useCallback((key: string) => setExpanded(key, !open.has(key)), [open, setExpanded]);

  return { open, setExpanded, toggle };
};

export { useTreeExpansion };
