/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { ownerWindowOf } from '../../../primitives/dom/owner-window';
import { TITLE_CLASS } from '../../ContentHeader/ContentHeader.constants';
import { HEADER_PARTS, STACK_CLASSES } from '../ScreenPage.constants';
import type { RowSpace } from './row-fits.type';

const pixels = (value: string): number => Number.parseFloat(value) || 0;

const leastWidth = (strip: HTMLElement): number => {
  const inline = strip.getAttribute('style');
  strip.style.flex = 'none';
  strip.style.width = 'min-content';
  const width = strip.getBoundingClientRect().width;
  if (inline === null) strip.removeAttribute('style');
  else strip.setAttribute('style', inline);
  return width;
};

const isStrip = (part: HTMLElement): boolean => !HEADER_PARTS.some((name) => part.classList.contains(name));

const ownWidth = (part: HTMLElement): number =>
  (part.classList.contains(TITLE_CLASS) ? part.scrollWidth : part.getBoundingClientRect().width);

const inRow = (view: Window) => (part: Element): part is HTMLElement => {
  if (!isHTMLElement(part)) return false;
  const style = view.getComputedStyle(part);
  return style.position !== 'absolute' && style.display !== 'none';
};

const measureRow = (header: HTMLElement): RowSpace => {
  const view = ownerWindowOf(header);
  const box = view.getComputedStyle(header);
  const parts = [...header.children].filter(inRow(view));
  const strips = parts.filter(isStrip);
  return {
    widths: parts.filter((part) => !isStrip(part)).map(ownWidth),
    strip: strips.reduce((sum, part) => sum + leastWidth(part), 0),
    gap: pixels(box.columnGap),
    room: header.clientWidth - pixels(box.paddingLeft) - pixels(box.paddingRight),
  };
};

const headerSpace = (header: HTMLElement): RowSpace => {
  const kept = STACK_CLASSES.all.filter((name) => header.classList.contains(name));
  header.classList.remove(...kept);
  const space = measureRow(header);
  header.classList.add(...kept);
  return space;
};

export { headerSpace };
