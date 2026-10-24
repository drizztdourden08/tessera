/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import type { GridCollapsed, GridCollapsedInput } from './useGridCollapsed.type';

const useGridCollapsed = (input: GridCollapsedInput): GridCollapsed => {
  const { collapsed, defaultCollapsed, onToggleSection } = input;
  const [own, setOwn] = useState<readonly string[]>(defaultCollapsed ?? []);
  const keys = collapsed ?? own;
  const set = useMemo(() => new Set(keys), [keys]);

  const apply = useCallback((key: string, next: boolean) => {
    if (set.has(key) === next) return;
    if (collapsed === undefined) setOwn((before) => (next ? [...before, key] : before.filter((entry) => entry !== key)));
    onToggleSection?.(key, next);
  }, [set, collapsed, onToggleSection]);

  return { set, setCollapsed: apply };
};

export { useGridCollapsed };
