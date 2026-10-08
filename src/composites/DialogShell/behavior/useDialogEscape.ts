/* @layer renderer-components @kind hook */
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useEscapeLayer } from '../../../primitives/escape-stack/useEscapeLayer';

const stay = (): void => undefined;

const useDialogEscape = (node: HTMLElement | null, dismissable: boolean, onClose: () => void): void => {
  useEscapeLayer(node ? ownerDocumentOf(node) : null, 'dialog', dismissable ? onClose : stay);
};

export { useDialogEscape };
