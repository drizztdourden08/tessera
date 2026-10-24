/* @layer renderer-components @kind hook */
import { useCallback, useRef } from 'react';
import type { ToolbarLayout, ToolbarSide } from '../ToolbarDock.type';
import { canShowToolbar } from './can-show-toolbar';
import { createToolbarLayout } from './create-toolbar-layout';
import { hideToolbar } from './hide-toolbar';
import { isToolbarShown } from './is-toolbar-shown';
import { moveToolbar } from './move-toolbar';
import { showToolbar } from './show-toolbar';
import { toggleToolbar } from './toggle-toolbar';
import type { ToolbarLayoutApi, UseToolbarLayoutParams } from './useToolbarLayout.type';

const useToolbarLayout = (params: UseToolbarLayoutParams): ToolbarLayoutApi => {
  const latest = useRef(params);
  latest.current = params;

  const edit = useCallback((make: (layout: ToolbarLayout) => ToolbarLayout) => {
    const { value, onChange } = latest.current;
    const next = make(value);
    if (next !== value) onChange(next);
  }, []);

  const move = useCallback((id: string, side: ToolbarSide, index: number) => edit((layout) => moveToolbar(layout, id, side, index)), [edit]);
  const show = useCallback((id: string) => edit((layout) => showToolbar(layout, id, latest.current.definitions)), [edit]);
  const hide = useCallback((id: string) => edit((layout) => hideToolbar(layout, id)), [edit]);
  const toggle = useCallback((id: string) => edit((layout) => toggleToolbar(layout, id, latest.current.definitions)), [edit]);
  const isShown = useCallback((id: string) => isToolbarShown(latest.current.value, id), []);
  const canShow = useCallback((id: string) => canShowToolbar(latest.current.value, id, latest.current.definitions), []);
  const reset = useCallback(() => edit(() => createToolbarLayout(latest.current.definitions)), [edit]);

  return { layout: params.value, move, show, hide, toggle, isShown, canShow, reset };
};

export { useToolbarLayout };
