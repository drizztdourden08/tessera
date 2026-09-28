/* @layer renderer-components @kind logic */
import type { ViewKey } from '../snapshot';
import { notify } from './notify';
import { views } from './views';

const clearSessionView = (key: ViewKey): void => {
  if (views.delete(key)) notify();
};

export { clearSessionView };
