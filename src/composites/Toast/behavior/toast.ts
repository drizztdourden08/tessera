/* @layer renderer-components @kind logic */
import { toastStore } from './toast-store';
import type { ToastApi, ToastInput } from '../Toast.type';

const toast: ToastApi = Object.assign((input: ToastInput) => toastStore.show(input), {
  dismiss: toastStore.dismiss,
  clear: toastStore.clear,
});

export { toast };
