/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { observeResize } from '../../../primitives/dom/observe-resize';
import { ROW_SELECTOR } from '../SettingsRow.constants';
import { choiceRoom } from './choice-room';
import { measureRow } from './measure-row';

const useChoiceFit = (probeRef: RefObject<HTMLElement | null>, compact: boolean, contentKey: string): boolean => {
  const [fits, setFits] = useState(true);

  useLayoutEffect(() => {
    const probe = probeRef.current;
    const row = probe?.closest<HTMLElement>(ROW_SELECTOR);
    if (!probe || !row) return undefined;
    const update = () => setFits(probe.getBoundingClientRect().width <= choiceRoom(measureRow(row), compact));
    update();
    return observeResize([row, probe], update);
  }, [probeRef, compact, contentKey]);

  return fits;
};

export { useChoiceFit };
