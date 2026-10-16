/* @layer renderer-components @kind util */
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { rowElement } from './row-element';

const holdsFocus = (list: HTMLElement | null, id: string): boolean => {
  const row = rowElement(list, id);
  return row?.contains(ownerDocumentOf(row).activeElement) ?? false;
};

export { holdsFocus };
