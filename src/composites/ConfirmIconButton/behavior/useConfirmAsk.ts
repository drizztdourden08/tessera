/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { ConfirmAsk, ConfirmAskOptions } from './useConfirmAsk.type';

const useConfirmAsk = <T>(options: ConfirmAskOptions<T>): ConfirmAsk<T> => {
  const { onConfirm, onCancel, onAsk, onSettle, disabled = false, timeout, initial = null } = options;
  const [asking, setAsking] = useState<T | null>(disabled ? null : initial);

  const settle = (ran: boolean): void => {
    if (asking === null) return;
    setAsking(null);
    onSettle?.(asking, ran);
    if (ran) onConfirm(asking);
    else onCancel?.(asking);
  };
  const drop = useEffectEvent(() => settle(false));

  useEffect(() => {
    if (disabled) drop();
  }, [disabled]);

  useEffect(() => {
    if (asking === null || timeout === undefined) return undefined;
    const timer = setTimeout(drop, timeout);
    return () => clearTimeout(timer);
  }, [asking, timeout]);

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || asking === null) return;
    event.stopPropagation();
    settle(false);
  };

  const ask = (value: T): void => {
    if (disabled || Object.is(value, asking)) return;
    if (asking !== null) onCancel?.(asking);
    setAsking(value);
    onAsk?.(value);
  };

  return { asking, ask, confirm: () => settle(true), cancel: () => settle(false), onKeyDown };
};

export { useConfirmAsk };
