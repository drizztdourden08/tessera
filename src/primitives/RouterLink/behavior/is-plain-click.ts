/* @layer renderer-components @kind util */
import type { MouseEvent } from 'react';

const isPlainClick = (event: MouseEvent<HTMLAnchorElement>): boolean => {
  const { button, metaKey, ctrlKey, shiftKey, altKey, defaultPrevented, currentTarget } = event;
  if (defaultPrevented || button !== 0) return false;
  if (metaKey || ctrlKey || shiftKey || altKey) return false;
  const target = currentTarget.getAttribute('target');
  return (target === null || target === '_self') && !currentTarget.hasAttribute('download');
};

export { isPlainClick };
