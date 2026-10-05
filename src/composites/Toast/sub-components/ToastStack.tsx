/* @layer renderer-components @kind component */
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Box } from '../../../primitives/Box';
import { Portal } from '../../../primitives/Portal';
import { toastStore } from '../behavior/toast-store';
import { Toast } from '../Toast';
import { TOAST_MAX } from '../Toast.constants';
import type { ToastStackProps } from '../Toast.type';

const ToastStack = (props: ToastStackProps) => {
  const { position = 'bottom-right', max = TOAST_MAX } = props;
  const [stack] = useState(toastStore.mint);
  const queue = useSyncExternalStore(toastStore.subscribe, toastStore.read, toastStore.read);
  useEffect(() => toastStore.claim(stack), [stack]);
  if (queue.owner !== stack) return null;

  return (
    <Portal layer="toast">
      <Box className={`toast-container toast-container--${position}`} role="status" aria-live="polite">
        {queue.items.slice(0, Math.max(max, 1)).map((item) => (
          <Toast key={item.id} item={item} onDismiss={toastStore.dismiss} />
        ))}
      </Box>
    </Portal>
  );
};

export { ToastStack };
