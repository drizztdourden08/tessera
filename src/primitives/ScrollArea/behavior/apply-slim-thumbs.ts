/* @layer renderer-components @kind util */
import type { SlimThumbs, ThumbSpan } from './slim-thumb.type';

const setSpan = (node: HTMLElement, along: 'y' | 'x', span: ThumbSpan | null): void => {
  const fraction = `--scroll-thumb-${along}-fraction`;
  const progress = `--scroll-thumb-${along}-progress`;
  if (!span) {
    node.style.removeProperty(fraction);
    node.style.removeProperty(progress);
    return;
  }
  node.style.setProperty(fraction, String(span.fraction));
  node.style.setProperty(progress, String(span.progress));
};

const applySlimThumbs = (node: HTMLElement, thumbs: SlimThumbs | null): void => {
  setSpan(node, 'y', thumbs?.y ?? null);
  setSpan(node, 'x', thumbs?.x ?? null);
};

export { applySlimThumbs };
