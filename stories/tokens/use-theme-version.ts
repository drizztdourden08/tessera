/* @layer stories @kind hook */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

const WATCHED = ['data-palette'];

const useThemeVersion = (ref: RefObject<Element | null>): number => {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const root = ref.current?.ownerDocument.documentElement;
    if (!root) return undefined;
    const observer = new MutationObserver(() => setVersion((n) => n + 1));
    observer.observe(root, { attributes: true, subtree: true, attributeFilter: WATCHED });
    return () => observer.disconnect();
  }, [ref]);
  return version;
};

export { useThemeVersion };
