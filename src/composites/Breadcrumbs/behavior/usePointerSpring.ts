/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { SpringOpen } from '../Breadcrumbs.type';

const usePointerSpring = (spring: SpringOpen, id: string, active: boolean): void => {
  const { hold, release } = spring;
  useEffect(() => {
    if (!active) return undefined;
    hold(id);
    return release;
  }, [active, hold, release, id]);
};

export { usePointerSpring };
