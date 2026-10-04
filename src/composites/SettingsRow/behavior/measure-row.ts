/* @layer renderer-components @kind logic */
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { TEXT_SELECTOR, TITLE_SELECTOR } from '../SettingsRow.constants';
import type { RowBox } from './choice-room.type';

const px = (value: string): number => Number.parseFloat(value) || 0;

const titleNeed = (row: HTMLElement): number => {
  const lead = row.querySelector<HTMLElement>(TEXT_SELECTOR)?.firstElementChild;
  const title = lead?.matches(TITLE_SELECTOR) === true ? lead : lead?.querySelector<HTMLElement>(TITLE_SELECTOR);
  return lead && title ? lead.getBoundingClientRect().width - title.clientWidth + title.scrollWidth : 0;
};

const measureRow = (row: HTMLElement): RowBox => {
  const style = ownerWindowOf(row).getComputedStyle(row);
  return { width: row.clientWidth, paddingInline: px(style.paddingLeft) + px(style.paddingRight), gap: px(style.columnGap), title: titleNeed(row) };
};

export { measureRow };
