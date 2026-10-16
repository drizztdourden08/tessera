/* @layer renderer-components @kind util */
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { ROW_SELECTOR } from '../ItemList.constants';
import { focusLost } from './focus-lost';
import { rowElement } from './row-element';

const focusIfLost = (list: HTMLElement | null, id: string | undefined): void => {
  requestAnimationFrame(() => {
    if (id === undefined || !focusLost(ownerDocumentOf(list))) return;
    rowElement(list, id)?.querySelector<HTMLElement>(ROW_SELECTOR)?.focus();
  });
};

export { focusIfLost };
