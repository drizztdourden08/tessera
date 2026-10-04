/* @layer renderer-components @kind hook */
import { useState } from 'react';

const useLogOpen = (logOpen: boolean | undefined, onLogToggle: ((open: boolean) => void) | undefined, failed: boolean) => {
  const [own, setOwn] = useState<boolean | null>(null);
  const toggle = (next: boolean): void => {
    setOwn(next);
    onLogToggle?.(next);
  };
  return { open: logOpen ?? own ?? failed, toggle };
};

export { useLogOpen };
