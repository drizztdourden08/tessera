/* @layer stories @kind hook */
import { useLayoutEffect, useRef, useState } from 'react';
import { useThemeVersion } from './use-theme-version';

type ComputedToken = { declared: string; resolved: string };

const EMPTY: ComputedToken = { declared: '', resolved: '' };

const useComputedToken = <E extends HTMLElement>(token: string, property = 'color') => {
  const ref = useRef<E | null>(null);
  const version = useThemeVersion(ref);
  const [value, setValue] = useState<ComputedToken>(EMPTY);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const style = getComputedStyle(el);
    setValue({ declared: style.getPropertyValue(token).trim(), resolved: style.getPropertyValue(property).trim() });
  }, [token, property, version]);

  return { ref, ...value };
};

export { useComputedToken };
