/* @layer renderer-components @kind logic */
import { POPUP_OPEN_ATTRIBUTE } from '../../dom/app-region.constants';
import type { DismissDocument, DismissLayer } from './dismiss-layers.type';

const rootOf = (doc: DismissDocument): HTMLElement | undefined =>
  ('documentElement' in doc ? (doc as Document).documentElement : undefined) ?? undefined;

const windowOf = (doc: DismissDocument): Window | undefined =>
  ('defaultView' in doc ? (doc as Document).defaultView : undefined) ?? undefined;

const closeAll = (stack: readonly DismissLayer[]): void => {
  [...stack].reverse().forEach((layer) => layer.close());
};

const openPopupsSession = (doc: DismissDocument, stack: readonly DismissLayer[]): (() => void) => {
  const root = rootOf(doc);
  const view = windowOf(doc);
  const leave = () => closeAll(stack);
  const hidden = () => {
    if ((doc as Document).visibilityState === 'hidden') leave();
  };
  root?.setAttribute(POPUP_OPEN_ATTRIBUTE, '');
  view?.addEventListener('blur', leave);
  doc.addEventListener('visibilitychange', hidden);
  return () => {
    root?.removeAttribute(POPUP_OPEN_ATTRIBUTE);
    view?.removeEventListener('blur', leave);
    doc.removeEventListener('visibilitychange', hidden);
  };
};

export { openPopupsSession };
