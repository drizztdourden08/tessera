/* @layer renderer-components @kind util */
import { ownerWindowOf } from './owner-window';

const stopNothing = (): void => undefined;

const observeResize = (
  elements: readonly (Element | null | undefined)[],
  onResize: (entries: readonly ResizeObserverEntry[]) => void,
): (() => void) => {
  const watched = elements.filter((element): element is Element => element != null);
  const first = watched[0];
  if (first === undefined) return stopNothing;
  const Observer = (ownerWindowOf(first) as Window & typeof globalThis).ResizeObserver;
  if (typeof Observer === 'undefined') return stopNothing;
  const observer = new Observer((entries) => onResize(entries));
  watched.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
};

export { observeResize };
