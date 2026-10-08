/* @layer renderer-components @kind hook */
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useEscapeLayer } from '../../../primitives/escape-stack/useEscapeLayer';
import { keyFromInside } from './key-from-inside';

const useLayerEscape = (node: HTMLElement | null, onClose: (() => void) | undefined): void => {
  useEscapeLayer(node && onClose ? ownerDocumentOf(node) : null, 'screen', () => onClose?.(), keyFromInside(node));
};

export { useLayerEscape };
