/* @layer renderer-components @kind logic */
import type { ToastQueue, ToastStore } from '../Toast.type';
import { queueToast } from './queue-toast';
import { toastKey } from './toast-key';

const createToastStore = (): ToastStore => {
  let queue: ToastQueue = { items: [], owner: null };
  let stacks: readonly string[] = [];
  let minted = 0;
  const listeners = new Set<() => void>();
  const write = (next: Partial<ToastQueue>) => {
    queue = { ...queue, ...next };
    listeners.forEach((listener) => listener());
  };
  const own = () => write({ owner: stacks[stacks.length - 1] ?? null });
  return {
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    read: () => queue,
    show: (input) => {
      const id = toastKey(input);
      const joined = queue.items.find((item) => item.id === id);
      write({ items: queueToast(queue.items, input, id) });
      joined?.onClose?.('replaced');
      return id;
    },
    dismiss: (id, reason = 'dismissed') => {
      const gone = queue.items.find((item) => item.id === id);
      if (!gone) return;
      write({ items: queue.items.filter((item) => item !== gone) });
      gone.onClose?.(reason);
    },
    clear: () => {
      const gone = queue.items;
      write({ items: [] });
      gone.forEach((item) => item.onClose?.('dismissed'));
    },
    mint: () => {
      minted += 1;
      return `toast-stack-${minted}`;
    },
    claim: (stack) => {
      stacks = [...stacks, stack];
      own();
      return () => {
        stacks = stacks.filter((entry) => entry !== stack);
        own();
      };
    },
  };
};

export { createToastStore };
