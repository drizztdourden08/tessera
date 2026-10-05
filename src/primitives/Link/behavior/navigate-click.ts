/* @layer renderer-components @kind util */
import type { MouseEvent, MouseEventHandler } from 'react';
import { isPlainClick } from './is-plain-click';

const navigateClick = (
  href: string,
  navigate: ((href: string) => void) | undefined,
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined,
): MouseEventHandler<HTMLAnchorElement> | undefined => {
  if (!navigate) return onClick;
  return (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!isPlainClick(event)) return;
    event.preventDefault();
    navigate(href);
  };
};

export { navigateClick };
