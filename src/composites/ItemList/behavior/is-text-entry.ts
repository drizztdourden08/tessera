/* @layer renderer-components @kind util */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { TEXT_ENTRY } from '../ItemList.constants';

const isTextEntry = (target: EventTarget | null): boolean => isHTMLElement(target) && target.matches(TEXT_ENTRY);

export { isTextEntry };
