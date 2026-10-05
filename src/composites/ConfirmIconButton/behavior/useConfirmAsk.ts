/* @layer renderer-components @kind hook */
import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { ConfirmAsk, ConfirmAskOptions } from './useConfirmAsk.type';

const useConfirmAsk = <T>(options: ConfirmAskOptions<T>): ConfirmAsk<T> => {
  const { onConfirm, onSettle, disabled = false, timeout, initial = null } = options;
  const [asking, setAsking] = useState<T | null>(disabled ? null : initial);

  useEffect(() => {
    if (disabled) setAsking(null);
  }, [disabled]);

  useEffect(() => {
    if (asking === null || timeout === undefined) return undefined;
    const timer = setTimeout(() => setAsking(null), timeout);
    return () => clearTimeout(timer);
  }, [asking, timeout]);

  const settle = (ran: boolean): void => {
    if (asking === null) return;
    setAsking(null);
    onSettle?.(asking, ran);
    if (ran) onConfirm(asking);
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || asking === null) return;
    event.stopPropagation();
    settle(false);
  };

  return {
    asking,
    ask: (value: T) => {
      if (!disabled) setAsking(value);
    },
    confirm: () => settle(true),
    cancel: () => settle(false),
    onKeyDown,
  };
};

export { useConfirmAsk };
