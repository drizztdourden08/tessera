/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { IDLE_SPEC, NO_SPECS } from '../CommandInput.constants';
import type { CommandSpec, CommandSpecControl, CommandSpecState } from '../CommandInput.type';
import { specBlank } from './spec-blank';
import { specReady } from './spec-ready';
import { specStart } from './spec-start';
import { specWithValue } from './spec-with-value';

const useCommandSpec = (specs: readonly CommandSpec[] = NO_SPECS): CommandSpecControl => {
  const [state, setState] = useState<CommandSpecState>(IDLE_SPEC);
  const spec = specs.find((one) => one.id === state.id) ?? null;
  const ready = spec !== null && specReady(spec, state.values);
  const pick = (id: string) => {
    const next = specs.find((one) => one.id === id);
    if (next !== undefined) setState({ id, values: specStart(next) });
  };
  const reset = () => setState((now) => (spec === null ? now : { id: now.id, values: specStart(spec) }));
  return {
    spec,
    values: state.values,
    text: spec !== null && ready ? spec.format(state.values) : '',
    ready,
    blank: specBlank(state.values),
    pick,
    clear: () => setState(IDLE_SPEC),
    reset,
    setValue: (name, value) => setState((now) => specWithValue(now, name, value)),
  };
};

export { useCommandSpec };
