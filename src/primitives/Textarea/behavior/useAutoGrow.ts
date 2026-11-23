/* @layer renderer-components @kind hook */
import { useLayoutEffect, type RefObject } from 'react';
import { grownHeight } from './grown-height';

const useAutoGrow = (ref: RefObject<HTMLTextAreaElement | null>, value: unknown, enabled: boolean, maxRows: number | undefined): void => {
  useLayoutEffect(() => {
    const area = ref.current;
    if (!enabled || !area) return undefined;
    const fit = () => {
      area.style.height = 'auto';
      area.style.height = `${grownHeight(area, maxRows)}px`;
    };
    fit();
    area.addEventListener('input', fit);
    return () => {
      area.removeEventListener('input', fit);
      area.style.height = '';
    };
  }, [ref, value, enabled, maxRows]);
};

export { useAutoGrow };
