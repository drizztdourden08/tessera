/* @layer renderer-components @kind hook */
import { useEffect } from 'react';

const useScrollTarget = (target: HTMLElement | null, reduced: boolean): void => {
  useEffect(() => {
    target?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'instant' : 'smooth' });
  }, [target, reduced]);
};

export { useScrollTarget };
