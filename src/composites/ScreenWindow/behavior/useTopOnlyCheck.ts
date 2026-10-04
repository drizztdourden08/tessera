/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { devWarn } from '../../../primitives/dom/dev-warn';
import { TOP_ONLY } from '../ScreenWindow.constants';
import type { ScreenWindowProps } from '../ScreenWindow.type';

const useTopOnlyCheck = (props: ScreenWindowProps) => {
  const lost = props.header !== undefined && (props.subtitle != null || props.extra != null || props.onBack !== undefined);
  useEffect(() => {
    if (lost) devWarn(TOP_ONLY);
  }, [lost]);
};

export { useTopOnlyCheck };
