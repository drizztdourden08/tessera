/* @layer renderer-components @kind hook */
import { useEffect } from 'react';
import { devWarn } from '../../../primitives/dom/dev-warn';
import { BARE_ONLY, TOP_ONLY } from '../ScreenWindow.constants';
import type { ScreenWindowProps } from '../ScreenWindow.type';

const useTopOnlyCheck = (props: ScreenWindowProps) => {
  const lost = props.header !== undefined && (props.subtitle != null || props.extra != null);
  const titled = props.titleRow !== false || props.header !== undefined;
  const misplaced = (props.titleRow === false && props.header !== undefined) || (props.movable === true && titled);
  useEffect(() => {
    if (lost) devWarn(TOP_ONLY);
  }, [lost]);
  useEffect(() => {
    if (misplaced) devWarn(BARE_ONLY);
  }, [misplaced]);
};

export { useTopOnlyCheck };
