/* @layer renderer-components @kind logic */
import type { SessionView } from '../session-view';
import type { ViewKey } from '../snapshot';
import { notify } from './notify';
import { views } from './views';

const setSessionView = (key: ViewKey, view: SessionView): void => {
  views.set(key, view);
  notify();
};

export { setSessionView };
