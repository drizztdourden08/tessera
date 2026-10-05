/* @layer renderer-components @kind component */
import { useCallback, useRef, useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { useToastTimer } from './behavior/useToastTimer';
import type { ToastProps } from './Toast.type';
import './Toast.css';

const Toast = (props: ToastProps) => {
  const { item, onDismiss } = props;
  const [exiting, setExiting] = useState(false);
  const { fields } = useTesseraStrings();
  const variant = item.variant ?? 'info';
  const { action } = item;
  const toastRef = useRef<HTMLDivElement>(null);
  const returnRef = useRef<(toast: HTMLElement | null) => void>(() => undefined);

  const dismiss = useCallback(() => {
    returnRef.current(toastRef.current);
    setExiting(true);
    setTimeout(() => onDismiss(item.id), 200);
  }, [item.id, onDismiss]);
  const hold = useToastTimer(item.duration, dismiss);
  returnRef.current = hold.returnFocus;

  const run = () => {
    action?.onSelect();
    dismiss();
  };

  return (
    <div ref={toastRef} className={`toast toast--${variant} ${exiting ? 'toast--exiting' : ''}`} role={variant === 'danger' ? 'alert' : undefined} {...hold.handlers}>
      <Span className="toast__message">{item.message}</Span>
      {action && <Button variant={variant} size="sm" className="toast__action" onClick={run}>{action.label}</Button>}
      <button type="button" className="toast__close" onClick={dismiss} aria-label={fields.dismiss}>
        <Icon name="x" />
      </button>
    </div>
  );
};

export { Toast };
