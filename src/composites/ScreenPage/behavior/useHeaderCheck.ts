/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { devWarn } from '../../../primitives/dom/dev-warn';
import { MISSING_HEADER } from '../ScreenPage.constants';

const isEmpty = (node: ReactNode): boolean => node == null || node === false || node === '';

const useHeaderCheck = (icon: ReactNode, title: ReactNode) => {
  const missing = isEmpty(icon) || isEmpty(title);
  useEffect(() => {
    if (missing) devWarn(MISSING_HEADER);
  }, [missing]);
};

export { useHeaderCheck };
