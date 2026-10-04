/* @layer renderer-components @kind util */
import { isHTMLElement } from './is-html-element';
import { TABBABLE } from './tabbable.constants';

const reachable = (el: HTMLElement): boolean =>
  el.tabIndex >= 0 && el.closest('[inert], [hidden], [aria-hidden="true"]') === null && el.getClientRects().length > 0;

const radioOf = (el: HTMLElement): HTMLInputElement | null =>
  el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'radio' && (el as HTMLInputElement).name !== '' ? el as HTMLInputElement : null;

const radioStop = (el: HTMLElement, all: readonly HTMLElement[]): boolean => {
  const radio = radioOf(el);
  if (!radio) return true;
  const group = all.map(radioOf).filter((other) => other?.name === radio.name);
  return (group.find((other) => other?.checked) ?? group[0]) === radio;
};

const tabbablesIn = (root: HTMLElement | null): HTMLElement[] => {
  if (!root) return [];
  const all = [...root.querySelectorAll(TABBABLE)].filter(isHTMLElement).filter(reachable);
  return all.filter((el) => radioStop(el, all));
};

export { tabbablesIn };
