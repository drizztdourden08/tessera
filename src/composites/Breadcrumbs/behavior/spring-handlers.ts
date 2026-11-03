/* @layer renderer-components @kind logic */
import type { HTMLAttributes } from 'react';
import type { SpringOpen } from '../Breadcrumbs.type';

const springHandlers = (spring: SpringOpen, id: string, enabled: boolean): HTMLAttributes<HTMLElement> => {
  if (!enabled) return {};
  return {
    onDragEnter: () => spring.hold(id),
    onDragLeave: (event) => {
      const into = event.relatedTarget;
      if (!(into instanceof Node) || !event.currentTarget.contains(into)) spring.release();
    },
    onDrop: () => spring.close(),
  };
};

export { springHandlers };
