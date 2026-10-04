/* @layer renderer-components @kind hook */
import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { tabbablesIn } from '../../dom/tabbables-in';
import { DESCRIBED_BY } from './useDescribedBy.constants';

const useDescribedBy = (anchorRef: RefObject<HTMLElement | null>, id: string | undefined, own: boolean): void => {
  useLayoutEffect(() => {
    const target = own ? null : tabbablesIn(anchorRef.current)[0];
    if (!target || !id) return undefined;
    const before = target.getAttribute(DESCRIBED_BY);
    target.setAttribute(DESCRIBED_BY, [before, id].filter(Boolean).join(' '));
    return () => {
      if (before === null) target.removeAttribute(DESCRIBED_BY);
      else target.setAttribute(DESCRIBED_BY, before);
    };
  }, [anchorRef, id, own]);
};

export { useDescribedBy };
