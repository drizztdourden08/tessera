/* @layer renderer-components @kind util */
import type { DragEvent } from 'react';

const isNode = (value: unknown): value is Node => typeof value === 'object' && value !== null && typeof (value as Node).nodeType === 'number';

const leftZone = (event: DragEvent<HTMLElement>): boolean => {
  const next = event.relatedTarget;
  return isNode(next) && !event.currentTarget.contains(next);
};

export { leftZone };
