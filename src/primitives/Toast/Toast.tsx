/* @layer renderer-components @kind component */
import { useState, useCallback } from 'react';
import { Button } from '../Button';
import { Glyph } from '../Glyph';
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

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(item.id), 200);
  }, [item.id, onDismiss]);
  const hold = useToastTimer(item.duration, dismiss);

  const run = () => {
    action?.onSelect();
    dismiss();
  };

  return (
    <div className={`toast toast--${variant} ${exiting ? 'toast--exiting' : ''}`} role={variant === 'danger' ? 'alert' : undefined} {...hold}>
      <Span className="toast__message">{item.message}</Span>
      {action && <Button variant={variant} size="sm" className="toast__action" onClick={run}>{action.label}</Button>}
      <button type="button" className="toast__close" onClick={dismiss} aria-label={fields.dismiss}>
        <Glyph name="close" />
      </button>
    </div>
  );
};

export { Toast };
