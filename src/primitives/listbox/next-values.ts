/* @layer renderer-components @kind util */
import type { SelectionLimits } from './listbox-model.type';

const nextValues = <V>(
  current: readonly V[],
  value: V,
  identityOf: (value: V) => string,
  limits: SelectionLimits,
): readonly V[] | null => {
  const identity = identityOf(value);
  const has = current.some((entry) => identityOf(entry) === identity);
  if (limits.max <= 1) {
    if (!has) return [value];
    return limits.min < 1 ? [] : null;
  }
  if (has) return current.length > limits.min ? current.filter((entry) => identityOf(entry) !== identity) : null;
  return current.length < limits.max ? [...current, value] : null;
};

export { nextValues };
