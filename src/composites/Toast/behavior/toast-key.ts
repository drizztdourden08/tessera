/* @layer renderer-components @kind logic */
import type { ToastInput } from '../Toast.type';

const toastKey = (input: ToastInput): string => input.id ?? `${input.variant ?? 'info'}:${input.message}`;

export { toastKey };
