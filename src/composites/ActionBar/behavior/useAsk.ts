/* @layer renderer-components @kind hook */
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useConfirmAsk } from '../../ConfirmIconButton/behavior/useConfirmAsk';
import { ACTION_ID_ATTRIBUTE, MORE_CLASS } from '../ActionBar.constants';
import type { ActionItem } from '../ActionBar.type';

const focusBack = (bar: HTMLElement | null, id: string): void => {
  const own = bar?.querySelector<HTMLElement>(`[${ACTION_ID_ATTRIBUTE}="${CSS.escape(id)}"]`);
  (own ?? bar?.querySelector<HTMLElement>(`.${MORE_CLASS}`))?.focus();
};

const useAsk = (barRef: RefObject<HTMLElement | null>) => {
  const backTo = useRef<string | null>(null);
  const ask = useConfirmAsk<ActionItem>({
    onConfirm: (action) => action.onSelect(),
    onCancel: (action) => action.onCancel?.(),
    onSettle: (action, ran, held) => {
      if (ran || held) backTo.current = action.id;
    },
  });

  useEffect(() => {
    if (ask.asking || backTo.current === null) return;
    focusBack(barRef.current, backTo.current);
    backTo.current = null;
  }, [ask.asking, barRef]);

  return ask;
};

export { useAsk };
