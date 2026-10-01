/* @layer renderer-components @kind util */
import type { WizardValues } from './wizard.type';

const isDirty = <V extends WizardValues>(values: V, initial: V): boolean => {
  if (values === initial) return false;
  const keys = new Set([...Object.keys(values), ...Object.keys(initial)]);
  return [...keys].some((key) => !Object.is(Reflect.get(values, key), Reflect.get(initial, key)));
};

export { isDirty };
