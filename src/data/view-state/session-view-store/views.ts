/* @layer renderer-components @kind logic */
import type { SessionView } from '../session-view';
import type { ViewKey } from '../snapshot';

const views = new Map<ViewKey, SessionView>();

export { views };
