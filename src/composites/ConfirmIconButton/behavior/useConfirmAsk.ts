/* @layer renderer-components @kind hook */
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useEscapeStack } from '../../../primitives/escape-stack/useEscapeStack';
import { useAskFocus } from './useAskFocus';
import { useCancelOnUnmount } from './useCancelOnUnmount';
import type { ConfirmAsk, ConfirmAskOptions } from './useConfirmAsk.type';

const useConfirmAsk = <T>(options: ConfirmAskOptions<T>): ConfirmAsk<T> => {
  const { onConfirm, onCancel, onAsk, onSettle, disabled = false, timeout, initial = null } = options;
  const [asking, setAsking] = useState<T | null>(disabled ? null : initial);
  const open = useRef(asking);
  const focus = useAskFocus(asking);
  useCancelOnUnmount(open, onCancel);

  const settle = (ran: boolean): void => {
    const value = open.current;
    if (value === null) return;
    open.current = null;
    const held = focus.leave(ran);
    setAsking(null);
    onSettle?.(value, ran, held);
    if (ran) onConfirm(value);
    else onCancel?.(value);
  };
  const drop = useEffectEvent(() => settle(false));
  useEscapeStack({ level: 'popover', onEscape: () => settle(false), active: asking !== null });

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
    event.preventDefault();
    event.stopPropagation();
    settle(false);
  };

  const ask = (value: T): void => {
    if (disabled || Object.is(value, asking)) return;
    if (asking !== null) onCancel?.(asking);
    open.current = value;
    setAsking(value);
    onAsk?.(value);
  };

  const { holdRef, triggerRef } = focus;
  return { asking, ask, confirm: () => settle(true), cancel: () => settle(false), onKeyDown, holdRef, triggerRef };
};

export { useConfirmAsk };
