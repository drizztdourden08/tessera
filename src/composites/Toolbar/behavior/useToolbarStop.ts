/* @layer renderer-components @kind hook */
import { useState } from 'react';
import type { FocusEvent } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { STOP_ATTRIBUTE, STOP_SELECTOR } from '../Toolbar.constants';
import { tabbableStop } from './tabbable-stop';

const useToolbarStop = (ids: readonly string[]) => {
  const [focused, setFocused] = useState<string | null>(null);
  const onFocus = (event: FocusEvent<HTMLElement>): void => {
    const stop = isHTMLElement(event.target) ? event.target.closest<HTMLElement>(STOP_SELECTOR) : null;
    const id = stop?.getAttribute(STOP_ATTRIBUTE);
    if (id) setFocused(id);
  };
  return { stop: tabbableStop(ids, focused), onFocus };
};

export { useToolbarStop };
