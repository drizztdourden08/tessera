/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Portal } from '../../../primitives/Portal';
import { Toast } from '../Toast';
import type { ToastContainerProps } from '../Toast.type';

const ToastContainer = (props: ToastContainerProps) => {
  const { toasts, onDismiss, position = 'bottom-right' } = props;

  return (
    <Portal layer="toast">
      <Box className={`toast-container toast-container--${position}`} role="status" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} item={t} onDismiss={onDismiss} />
        ))}
      </Box>
    </Portal>
  );
};

export { ToastContainer };
