/* @layer renderer-components @kind hook */
import type { HTMLAttributes } from 'react';
import type { ItemSpringInput } from '../Breadcrumbs.type';
import { springEnabled } from './spring-enabled';
import { springHandlers } from './spring-handlers';
import { usePointerSpring } from './usePointerSpring';

const useItemSpring = ({ spring, id, current, hasMenu, dropOver }: ItemSpringInput): HTMLAttributes<HTMLElement> => {
  const enabled = springEnabled(spring.mode, hasMenu, current);
  usePointerSpring(spring, id, dropOver && enabled);
  return springHandlers(spring, id, enabled);
};

export { useItemSpring };
