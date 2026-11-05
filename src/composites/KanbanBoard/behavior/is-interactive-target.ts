/* @layer renderer-components @kind util */
const INTERACTIVE = 'button, a, input, textarea, select, [role="menu"], [role="menuitem"], [role="button"]';

const isInteractiveTarget = (target: EventTarget | null): boolean => target instanceof Element && target.closest(INTERACTIVE) !== null;

export { isInteractiveTarget };
