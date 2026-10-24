/* @layer renderer-components @kind component */
import { useCallback, useRef, useState } from 'react';
import { Button } from '../../primitives/Button';
import { Icon } from '../../primitives/Icon';
import { Pressable } from '../../primitives/Pressable';
import { Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useToastTimer } from './behavior/useToastTimer';
import { useToastUndo } from './behavior/useToastUndo';
import { ToastSurface } from './sub-components/ToastSurface';
import { TOAST_EXIT } from './Toast.constants';
import type { ToastCloseReason, ToastProps } from './Toast.type';
import './Toast.css';

const Toast = (props: ToastProps) => {
  const { item, onDismiss } = props;
  const [exiting, setExiting] = useState(false);
  const { fields, common } = useTesseraStrings();
  const count = item.count ?? 1;
  const variant = item.variant ?? 'info';
  const toastRef = useRef<HTMLElement>(null);
  const returnRef = useRef<(toast: HTMLElement | null) => void>(() => undefined);
  const closing = useRef(false);

  const dismiss = useCallback((reason: ToastCloseReason) => {
    if (closing.current) return;
    closing.current = true;
    returnRef.current(toastRef.current);
    setExiting(true);
    setTimeout(() => onDismiss(item.id, reason), TOAST_EXIT);
  }, [item.id, onDismiss]);
  const hold = useToastTimer(item.duration, () => dismiss('expired'), count);
  returnRef.current = hold.returnFocus;
  const action = useToastUndo(item, !exiting, dismiss);

  const run = () => {
    action?.onSelect();
    dismiss('action');
  };

  return (
    <ToastSurface ref={toastRef} variant={variant} className={exiting ? 'toast--exiting' : ''} role={variant === 'danger' ? 'alert' : undefined} {...hold.handlers}>
      <Span className="toast__message">{item.message}</Span>
      {count > 1 && <Span className="toast__count" title={common.repeated(count)}>{common.repeatedShort(count)}</Span>}
      {action && <Button variant={variant} size="sm" className="toast__action" onClick={run}>{action.label}</Button>}
      <Pressable className="toast__close" onClick={() => dismiss('dismissed')} aria-label={fields.dismiss}>
        <Icon name="x" />
      </Pressable>
    </ToastSurface>
  );
};

export { Toast };
