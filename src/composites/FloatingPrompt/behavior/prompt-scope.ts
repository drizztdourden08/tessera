/* @layer renderer-components @kind logic */
import { PROMPT_SELECTOR, WINDOW_SCOPE_CLASS } from '../FloatingPrompt.constants';

const promptScope = (bar: HTMLElement): Element => {
  const layer = bar.closest(PROMPT_SELECTOR);
  if (layer === null || layer.classList.contains(WINDOW_SCOPE_CLASS)) return bar.ownerDocument.body;
  return layer.parentElement ?? bar.ownerDocument.body;
};

export { promptScope };
