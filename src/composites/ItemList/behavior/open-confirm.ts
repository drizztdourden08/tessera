/* @layer renderer-components @kind util */
import { DELETE_SELECTOR } from '../ItemList.constants';
import { rowElement } from './row-element';

const openConfirm = (list: HTMLElement | null, id: string): void => {
  rowElement(list, id)?.querySelector<HTMLElement>(DELETE_SELECTOR)?.click();
};

export { openConfirm };
