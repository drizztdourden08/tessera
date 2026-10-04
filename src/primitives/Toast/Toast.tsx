/* @layer renderer-components @kind component */
import { useState, useEffect, useCallback } from 'react';
import { Glyph } from '../Glyph';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import type { ToastProps } from './Toast.type';
import './Toast.css';

const Toast = (props: ToastProps) => {
  const { item, onDismiss } = props;
  const [exiting, setExiting] = useState(false);
  const { fields } = useTesseraStrings();
  const variant = item.variant ?? 'info';

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onDismiss(item.id), 200);
  }, [item.id, onDismiss]);

  useEffect(() => {
    if (item.duration && item.duration > 0) {
      const timer = setTimeout(dismiss, item.duration);
      return () => clearTimeout(timer);
    }
  }, [item.duration, dismiss]);

  return (
    <div className={`toast toast--${variant} ${exiting ? 'toast--exiting' : ''}`} role={variant === 'danger' ? 'alert' : undefined}>
      <Span className="toast__message">{item.message}</Span>
      <button type="button" className="toast__close" onClick={dismiss} aria-label={fields.dismiss}>
        <Glyph name="close" />
      </button>
    </div>
  );
};

export { Toast };
