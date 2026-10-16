/* @layer renderer-components @kind util */
import { isHTMLElement } from '../dom/is-html-element';
import { TEXT_ENTRY } from './undo-stack.constants';

const isTextEntry = (target: EventTarget | null): boolean => isHTMLElement(target) && target.matches(TEXT_ENTRY);

export { isTextEntry };
