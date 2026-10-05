/* @layer renderer-components @kind logic */
import type { PrefixedDocument, PrefixedElement } from '../Video.type';

const elementOf = (doc: Document): Element | null =>
  doc.fullscreenElement ?? (doc as PrefixedDocument).webkitFullscreenElement ?? null;

const enabledIn = (doc: Document): boolean =>
  doc.fullscreenEnabled === true || (doc as PrefixedDocument).webkitFullscreenEnabled === true;

const request = async (element: HTMLElement): Promise<void> => {
  if (typeof element.requestFullscreen === 'function') return element.requestFullscreen();
  const prefixed = (element as PrefixedElement).webkitRequestFullscreen;
  if (!prefixed) throw new Error('Full screen is not available');
  prefixed.call(element);
};

const requestWithin = (element: HTMLElement, graceMs: number): Promise<void> => new Promise((resolve, reject) => {
  const view = element.ownerDocument.defaultView;
  const timer = view?.setTimeout(() => reject(new Error('Full screen did not start')), graceMs);
  request(element).then(
    () => { view?.clearTimeout(timer); resolve(); },
    (error: unknown) => { view?.clearTimeout(timer); reject(error instanceof Error ? error : new Error(String(error))); },
  );
});

const exit = async (doc: Document): Promise<void> => {
  if (typeof doc.exitFullscreen === 'function') return doc.exitFullscreen();
  (doc as PrefixedDocument).webkitExitFullscreen?.call(doc);
};

const fullscreenApi = { elementOf, enabledIn, request, requestWithin, exit };

export { fullscreenApi };
