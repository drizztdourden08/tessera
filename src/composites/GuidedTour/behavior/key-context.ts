/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { TABBABLE } from '../../../primitives/dom/tabbable.constants';
import { EDITABLE } from '../GuidedTour.constants';
import type { TourKeyContext } from './tour-internal.type';

const keyContext = (event: KeyboardEvent, bubble: HTMLElement | null, waits: boolean): TourKeyContext => {
  const { target } = event;
  const element = isHTMLElement(target) ? target : null;
  return {
    modified: event.altKey || event.ctrlKey || event.metaKey || event.shiftKey,
    editable: element?.matches(EDITABLE) ?? false,
    interactive: element !== null && element !== bubble && element.matches(TABBABLE),
    waits,
  };
};

export { keyContext };
