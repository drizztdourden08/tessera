/* @layer stories @kind logic */
import type { WizardApi, WizardStepDef } from '../../../src/composites';

const noop = () => undefined;

const frozenWizard = <V extends object>(
  steps: readonly WizardStepDef<V>[],
  values: V,
  at: string,
  extra: Partial<WizardApi<V>> = {},
): WizardApi<V> => {
  const index = Math.max(steps.findIndex((step) => step.id === at), 0);
  const current = steps[index] ?? steps[0];
  if (current === undefined) throw new Error('frozenWizard needs a step.');
  const problem = current.validate?.(values) ?? null;
  const invalid = typeof problem === 'object' && problem !== null ? problem.message : problem;
  return {
    steps,
    current,
    index,
    isFirst: index === 0,
    isLast: index === steps.length - 1,
    invalid,
    hint: invalid,
    canGoTo: (id) => steps.findIndex((step) => step.id === id) < index,
    values,
    visited: steps.slice(0, index + 1).map((step) => step.id),
    errors: {},
    dirty: true,
    busy: false,
    setValue: noop,
    update: noop,
    setError: noop,
    goNext: noop,
    goBack: noop,
    goTo: noop,
    finish: () => Promise.resolve(),
    reset: noop,
    ...extra,
  };
};

export { frozenWizard };
