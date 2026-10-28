/* @layer renderer-components @kind hook */
import { useDismissListeners } from '../../Portal/behavior/useDismissListeners';
import type { UseAnchoredDismissParams } from './useAnchoredDismiss.type';

const useAnchoredDismiss = (params: UseAnchoredDismissParams): void => {
  const { onDismiss, dismissOnEscape = true, dismissOnOutsidePress = true, popupRef, anchor } = params;
  useDismissListeners({
    open: onDismiss !== undefined,
    onClose: () => onDismiss?.(),
    contentRef: popupRef,
    triggerRef: anchor,
    escape: dismissOnEscape,
    outsidePress: dismissOnOutsidePress,
  });
};

export { useAnchoredDismiss };
