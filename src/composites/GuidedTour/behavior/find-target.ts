/* @layer renderer-components @kind logic */
import { isHTMLElement } from '../../../primitives/dom/is-html-element';
import { QUOTED, TOUR_ATTRIBUTE } from '../GuidedTour.constants';
import type { TourTarget } from '../GuidedTour.type';

const selectorOf = (target: Exclude<TourTarget, { current: unknown }>): string =>
  ('tour' in target ? `[${TOUR_ATTRIBUTE}="${target.tour.replace(QUOTED, '\\$&')}"]` : target.selector);

const findTarget = (doc: Pick<Document, 'querySelector'>, target: TourTarget | undefined): HTMLElement | null => {
  if (!target) return null;
  if ('current' in target) return target.current;
  const found = doc.querySelector(selectorOf(target));
  return isHTMLElement(found) ? found : null;
};

export { findTarget };
