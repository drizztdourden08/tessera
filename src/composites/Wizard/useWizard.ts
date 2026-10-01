/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useReducer, useRef } from 'react';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { finishWizard } from './finish-wizard';
import { firstStepId } from './first-step-id';
import { initialWizardState } from './initial-wizard-state';
import { isDirty } from './is-dirty';
import { wizardMoves } from './wizard-moves';
import { wizardReducer } from './wizard-reducer';
import { wizardView } from './wizard-view';
import type { WizardApi, WizardOptions, WizardValues } from './wizard.type';

const useWizard = <V extends WizardValues>(options: WizardOptions<V>): WizardApi<V> => {
  const { steps, initialValues, onFinish, onFinished } = options;
  const { wizard } = useTesseraStrings();
  const [state, dispatch] = useReducer(
    wizardReducer<V>,
    initialValues,
    (values) => initialWizardState(values, firstStepId(steps, values)),
  );
  const handlers = useRef({ onFinish, onFinished });
  handlers.current = { onFinish, onFinished };

  const view = useMemo(() => wizardView(steps, state), [steps, state]);
  const moves = useMemo(() => wizardMoves(view, dispatch), [view]);

  const finish = useCallback(
    () => finishWizard({ view, state, dispatch, ...handlers.current, fallback: wizard.finishFailed }),
    [view, state, wizard.finishFailed],
  );
  const reset = useCallback(
    () => dispatch({ type: 'reset', values: initialValues, currentId: firstStepId(steps, initialValues) }),
    [steps, initialValues],
  );

  return useMemo(() => ({
    ...view,
    ...moves,
    values: state.values,
    visited: state.visited,
    errors: state.errors,
    busy: state.busy,
    dirty: !state.finished && isDirty(state.values, initialValues),
    finish,
    reset,
  }), [view, moves, state, initialValues, finish, reset]);
};

export { useWizard };
