/* @layer renderer-components @kind util */
import { INTERACTIVE } from './is-interactive-target.constants';

const isInteractiveTarget = (target: EventTarget | null): boolean => target instanceof Element && target.closest(INTERACTIVE) !== null;

export { isInteractiveTarget };
