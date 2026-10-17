/* @layer renderer-components @kind hook */
import { useId } from 'react';
import type { CSSProperties } from 'react';

const useNameAnchor = (active: boolean): CSSProperties | undefined => {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return active ? ({ '--list-item-name-anchor': `--list-item-name-${id}` } as CSSProperties) : undefined;
};

export { useNameAnchor };
