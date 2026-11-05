/* @layer renderer-components @kind util */
import { ownerDocumentOf } from '../../dom/owner-document';
import { reducedNow } from '../../dom/reduced-now';

const transitionPalette = (apply: () => void, animate: boolean, scope?: Element): void => {
  const doc = ownerDocumentOf(scope ?? null);
  const canAnimate = animate && typeof doc.startViewTransition === 'function' && !reducedNow(doc.documentElement);
  if (canAnimate) doc.startViewTransition(apply);
  else apply();
};

export { transitionPalette };
