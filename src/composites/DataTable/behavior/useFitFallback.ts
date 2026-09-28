/* @layer renderer-components @kind hook */
import { useMeasuredFallback } from './useMeasuredFallback';
import type { GrowFallback } from './overflow-probe.type';
import type { ChangeWatcher, FallbackResolver } from './useMeasuredFallback.type';
import type { UseFitFallbackInput } from './useFitFallback.type';

const keepFitted: FallbackResolver = (_root, _paths, fitted) => fitted;

const watchContent: ChangeWatcher = (root, onChange) => {
  if (typeof MutationObserver === 'undefined') return undefined;
  const observer = new MutationObserver(onChange);
  observer.observe(root, { childList: true, subtree: true, characterData: true });
  return () => observer.disconnect();
};

const useFitFallback = ({ columns, rootRef }: UseFitFallbackInput): GrowFallback =>
  useMeasuredFallback({ columns, rootRef, flag: 'fit', resolve: keepFitted, watch: watchContent });

export { useFitFallback };
