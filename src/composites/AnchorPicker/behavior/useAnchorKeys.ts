/* @layer renderer-components @kind hook */
import type { KeyboardEvent } from 'react';
import { ANCHOR_ATTRIBUTE } from '../AnchorPicker.constants';
import type { Anchor } from '../AnchorPicker.type';
import { moveAnchor } from './move-anchor';

const useAnchorKeys = (value: Anchor, onChange: (anchor: Anchor) => void) => (event: KeyboardEvent<HTMLElement>): void => {
  if (event.altKey || event.metaKey) return;
  const focused = (event.target as HTMLElement).getAttribute(ANCHOR_ATTRIBUTE) as Anchor | null;
  const next = moveAnchor(event.key, focused ?? value, event.ctrlKey);
  if (next === null) return;
  event.preventDefault();
  if (next !== value) onChange(next);
  event.currentTarget.querySelector<HTMLElement>(`[${ANCHOR_ATTRIBUTE}="${next}"]`)?.focus();
};

export { useAnchorKeys };
