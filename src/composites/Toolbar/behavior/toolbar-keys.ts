/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { STOP_SELECTOR } from '../Toolbar.constants';
import type { ToolbarOrientation } from '../Toolbar.type';
import { nextStop } from './next-stop';

const plain = (event: KeyboardEvent<HTMLElement>): boolean => !(event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey);

const toolbarKeys = (orientation: ToolbarOrientation) => (event: KeyboardEvent<HTMLElement>): void => {
  if (!plain(event) || !isHTMLElement(event.target)) return;
  const current = event.target.closest<HTMLElement>(STOP_SELECTOR);
  if (!current) return;
  const stops = [...event.currentTarget.querySelectorAll<HTMLElement>(STOP_SELECTOR)].filter((stop) => !stop.matches(':disabled'));
  const index = stops.indexOf(current);
  const next = index < 0 ? null : nextStop(event.key, current.tagName === 'INPUT' ? 'field' : orientation, index, stops.length);
  if (next === null) return;
  event.preventDefault();
  stops[next]?.focus();
};

export { toolbarKeys };
