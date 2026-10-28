/* @layer renderer-components @kind hook */
import { useCallback, useState } from 'react';

const usePath = (
  path: readonly string[] | undefined,
  defaultPath: readonly string[] | undefined,
  onPathChange: ((path: readonly string[]) => void) | undefined,
): readonly [readonly string[], (next: readonly string[]) => void] => {
  const [local, setLocal] = useState<readonly string[]>(defaultPath ?? []);
  const set = useCallback((next: readonly string[]) => {
    if (path === undefined) setLocal(next);
    onPathChange?.(next);
  }, [path, onPathChange]);
  return [path ?? local, set];
};

export { usePath };
