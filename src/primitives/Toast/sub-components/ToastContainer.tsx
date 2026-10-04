/* @layer renderer-components @kind component */
import { Portal } from '../../Portal';
import { Toast } from '../Toast';
import type { ToastContainerProps } from '../Toast.type';

const ToastContainer = (props: ToastContainerProps) => {
  const { toasts, onDismiss, position = 'bottom-right' } = props;

  return (
    <Portal layer="toast">
      <div className={`toast-container toast-container--${position}`} role="status" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} item={t} onDismiss={onDismiss} />
        ))}
      </div>
    </Portal>
  );
};

export { ToastContainer };
