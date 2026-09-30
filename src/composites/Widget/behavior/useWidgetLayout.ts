/* @layer renderer-components @kind hook */
import { useCallback } from 'react';
import type { WidgetLayout } from '../Widget.type';
import { createDefaultLayout } from './create-default-layout';
import { isWidgetOpen } from './is-widget-open';
import { openWidget } from './open-widget';
import { removeEverywhere } from './remove-everywhere';
import { usePersistedLayout } from './usePersistedLayout';
import type { UseWidgetLayoutParams } from './useWidgetLayout.type';

const useWidgetLayout = (params: UseWidgetLayoutParams) => {
  const { layout, change, latest } = usePersistedLayout(params);

  const setLayout = useCallback((next: WidgetLayout) => change(() => next), [change]);
  const open = useCallback((id: string) => change((prev) => openWidget(prev, id, latest.current.definitions)), [change, latest]);
  const close = useCallback((id: string) => change((prev) => removeEverywhere(prev, id)), [change]);
  const toggle = useCallback((id: string) => change((prev) => (
    isWidgetOpen(prev, id) ? removeEverywhere(prev, id) : openWidget(prev, id, latest.current.definitions)
  )), [change, latest]);
  const reset = useCallback(() => change(() => latest.current.preset ?? createDefaultLayout()), [change, latest]);

  return { layout, setLayout, open, close, toggle, reset };
};

export { useWidgetLayout };
