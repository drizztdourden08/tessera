/* @layer renderer-components @kind hook */
import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
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
    const view = ownerWindowOf(row) as Window & typeof globalThis;
    if (typeof view.ResizeObserver === 'undefined') return undefined;
    const observer = new view.ResizeObserver(update);
    observer.observe(row);
    observer.observe(probe);
    return () => observer.disconnect();
  }, [probeRef, compact, contentKey]);

  return fits;
};

export { useChoiceFit };
