/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { SPRING_OPEN_DELAY } from '../Breadcrumbs.constants';
import type { SpringOpen, SpringOpenMode, SpringOpenOptions } from '../Breadcrumbs.type';

const useSpringOpen = (options: SpringOpenOptions): SpringOpen => {
  const [openId, setOpenId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(options);
  const mode: SpringOpenMode = options.mode === 'navigate' ? 'navigate' : 'menu';

  useEffect(() => {
    latest.current = options;
  });

  const release = useCallback((): void => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const fire = useCallback((id: string): void => {
    const { mode: chosen, onNavigate, onSpringOpen } = latest.current;
    onSpringOpen?.(id);
    if (chosen === 'navigate') onNavigate(id);
    else setOpenId(id);
  }, []);
  const hold = useCallback((id: string): void => {
    release();
    timer.current = setTimeout(() => fire(id), SPRING_OPEN_DELAY);
  }, [release, fire]);
  const close = useCallback((): void => {
    release();
    setOpenId(null);
  }, [release]);

  useEffect(() => release, [release]);

  return { mode, openId, hold, release, close };
};

export { useSpringOpen };
