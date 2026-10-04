/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';
import type { OpenMenus } from './open-menus.type';

const useOpenMenus = (): OpenMenus => {
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set());
  const report = useCallback((id: string, next: boolean): void => {
    setOpen((current) => {
      if (current.has(id) === next) return current;
      const changed = new Set(current);
      if (next) changed.add(id);
      else changed.delete(id);
      return changed;
    });
  }, []);
  return { anyOpen: open.size > 0, report };
};

export { useOpenMenus };
