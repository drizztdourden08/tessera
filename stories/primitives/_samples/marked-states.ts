/* @layer stories @kind logic */
import type { ReactNode } from 'react';
import type { OverviewStates, StateEntry, StateProps } from '../../_template/states/states.type';

type MarkedRender = (props: StateProps, pseudo?: StateEntry['pseudo']) => ReactNode;

const markedStates = (list: readonly StateEntry[], render: MarkedRender): OverviewStates => ({
  render: (props) => render(props),
  list: list.map((entry) => ({ name: entry.name, render: () => render(entry.props ?? {}, entry.pseudo) })),
});

export { markedStates };
