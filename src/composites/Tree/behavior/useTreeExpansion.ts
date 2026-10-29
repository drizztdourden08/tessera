/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import type { TreeExpansion, TreeExpansionInput } from './useTreeExpansion.type';

const useTreeExpansion = (input: TreeExpansionInput): TreeExpansion => {
  const { expandedKeys, defaultExpandedKeys, onExpandedChange } = input;
  const [localKeys, setLocalKeys] = useState<readonly string[]>(defaultExpandedKeys ?? []);
  const keys = expandedKeys ?? localKeys;
  const open = useMemo(() => new Set(keys), [keys]);

  const setMany = useCallback((targets: readonly string[], expanded: boolean) => {
    const changed = targets.filter((key) => open.has(key) !== expanded);
    if (changed.length === 0) return;
    const next = expanded ? [...keys, ...changed] : keys.filter((key) => !changed.includes(key));
    if (expandedKeys === undefined) setLocalKeys(next);
    onExpandedChange?.(next);
  }, [open, keys, expandedKeys, onExpandedChange]);

  const setExpanded = useCallback((key: string, expanded: boolean) => setMany([key], expanded), [setMany]);
  const toggle = useCallback((key: string) => setMany([key], !open.has(key)), [open, setMany]);

  return { open, setExpanded, setMany, toggle };
};

export { useTreeExpansion };
