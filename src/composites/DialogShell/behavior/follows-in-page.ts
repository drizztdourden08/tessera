/* @layer renderer-components @kind logic */
import { DOCUMENT_POSITION_FOLLOWING } from './follows-in-page.constants';

const followsInPage = (from: Element | null) => (stop: Element): boolean =>
  from !== null && (from.compareDocumentPosition(stop) & DOCUMENT_POSITION_FOLLOWING) !== 0;

export { followsInPage };
