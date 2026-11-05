/* @layer renderer-components @kind util */
import type { KeyboardEvent, MouseEvent } from 'react';
import { isInteractiveTarget } from '../../dom/is-interactive-target';
import type { ActivationProps } from './card-activation.type';

const ownsClick = (event: MouseEvent<HTMLDivElement>): boolean =>
  event.currentTarget.contains(event.target as Node | null) && !isInteractiveTarget(event.target, event.currentTarget);

const isActivationKey = (event: KeyboardEvent<HTMLDivElement>): boolean =>
  event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ');

const cardActivation = (onActivate: (() => void) | undefined, rest: ActivationProps): ActivationProps => {
  if (onActivate === undefined) return {};
  return {
    tabIndex: rest.tabIndex ?? 0,
    onClick: (event) => {
      rest.onClick?.(event);
      if (!event.defaultPrevented && ownsClick(event)) onActivate();
    },
    onKeyDown: (event) => {
      rest.onKeyDown?.(event);
      if (event.defaultPrevented || !isActivationKey(event)) return;
      event.preventDefault();
      onActivate();
    },
  };
};

export { cardActivation };
