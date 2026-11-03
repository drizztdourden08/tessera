/* @layer renderer-components @kind logic */
import type { KeyboardEvent } from 'react';
import { isMenuKey } from '../../ContextMenu/behavior/is-menu-key';
import type { RampContextEvent, RampStepContextProps } from '../RampStrip.type';

const stepContextProps = (handler: ((event: RampContextEvent) => void) | undefined, hasMenu: boolean): RampStepContextProps => {
  if (handler === undefined) return {};
  return {
    onContextMenu: handler,
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (!isMenuKey(event)) return;
      handler(event);
      if (!hasMenu) event.preventDefault();
    },
  };
};

export { stepContextProps };
