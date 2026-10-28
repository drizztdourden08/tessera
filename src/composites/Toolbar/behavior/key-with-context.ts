/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import type { ToolbarContextEvent } from '../Toolbar.type';
import { isContextKey } from './is-context-key';

const keyWithContext = <Element extends HTMLElement>(
  onKeyDown: (event: KeyboardEvent<Element>) => void,
  onContext: ((event: ToolbarContextEvent) => void) | undefined,
): ((event: KeyboardEvent<Element>) => void) => {
  if (onContext === undefined) return onKeyDown;
  return (event) => {
    if (isContextKey(event)) onContext(event);
    else onKeyDown(event);
  };
};

export { keyWithContext };
