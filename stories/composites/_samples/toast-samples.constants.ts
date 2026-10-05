/* @layer stories @kind data */
import type { ToastVariant } from '../../../src/composites';

const TOAST_VARIANTS: readonly ToastVariant[] = ['info', 'success', 'warning', 'danger'];

const SAMPLE_MESSAGES: Readonly<Record<ToastVariant, string>> = {
  info: 'A new player joined the session.',
  success: 'Save state written to slot 3.',
  warning: 'The tracker lost sync. Retrying.',
  danger: 'This ROM does not match a supported version.',
};

export { SAMPLE_MESSAGES, TOAST_VARIANTS };
