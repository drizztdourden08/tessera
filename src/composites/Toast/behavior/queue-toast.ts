/* @layer renderer-components @kind logic */
import { TOAST_DURATION } from '../Toast.constants';
import type { ToastInput, ToastItem } from '../Toast.type';

const queueToast = (items: readonly ToastItem[], input: ToastInput, id: string): readonly ToastItem[] => {
  const same = items.find((item) => item.id === id);
  const next: ToastItem = { duration: TOAST_DURATION, ...input, id, count: (same?.count ?? 0) + 1 };
  return same ? items.map((item) => (item === same ? next : item)) : [...items, next];
};

export { queueToast };
