/* @layer renderer-components @kind util */
import { OPEN_SELECT_SELECTOR } from './menu-items-of.constants';

const inOpenSelect = (target: EventTarget): boolean => target instanceof Element && target.closest(OPEN_SELECT_SELECTOR) !== null;

export { inOpenSelect };
