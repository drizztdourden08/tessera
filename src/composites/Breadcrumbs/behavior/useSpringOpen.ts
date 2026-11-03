/* @layer renderer-components @kind hook */
import { useCallback, useEffect, useRef, useState } from 'react';
import { SPRING_OPEN_DELAY } from '../Breadcrumbs.constants';
import type { SpringOpen } from '../Breadcrumbs.type';

const useSpringOpen = (): SpringOpen => {
  const [openId, setOpenId] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const release = useCallback((): void => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const hold = useCallback((id: string): void => {
    release();
    timer.current = setTimeout(() => setOpenId(id), SPRING_OPEN_DELAY);
  }, [release]);
  const close = useCallback((): void => {
    release();
    setOpenId(null);
  }, [release]);

  useEffect(() => release, [release]);

  return { openId, hold, release, close };
};

export { useSpringOpen };
