/* @layer renderer-components @kind util */
import { ownerDocumentOf } from './owner-document';

const restoreFocus = (target: HTMLElement | null | undefined): boolean => {
  if (!target?.isConnected) return false;
  const doc = ownerDocumentOf(target);
  const active = doc.activeElement;
  if (active && active !== doc.body && active !== doc.documentElement) return false;
  target.focus();
  return true;
};

export { restoreFocus };
