/* @layer stories @kind types */
import type { ReactNode } from 'react';

type PseudoState = 'hover' | 'focus' | 'focus-visible' | 'focus-within' | 'active';

type StateProps = Readonly<Record<string, unknown>>;

type StateRender = (props: StateProps) => ReactNode;

interface StateEntry {
  name: string;
  pseudo?: PseudoState | readonly PseudoState[];
  props?: StateProps;
  render?: StateRender;
  target?: string;
}

interface OverviewStates {
  render: StateRender;
  list: readonly StateEntry[];
}

interface StateCellProps {
  entry: StateEntry;
  render: StateRender;
}

type StateKey = 'idle' | 'hover' | 'focus' | 'active' | 'selected' | 'checked' | 'open' | 'readOnly' | 'loading' | 'error' | 'disabled';

export type { OverviewStates, PseudoState, StateCellProps, StateEntry, StateKey, StateProps };
