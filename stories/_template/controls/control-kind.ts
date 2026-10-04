/* @layer stories @kind logic */
import { optionLabel } from './option-label';
import { SEGMENTED_LIMIT } from './arg-controls.constants';
import type { ControlKind, PlaygroundArgType } from './playground.type';

const isShortChoice = (options: readonly unknown[]): boolean =>
  options.length > 1 && options.length <= SEGMENTED_LIMIT.count
  && options.every((option) => optionLabel(option).length <= SEGMENTED_LIMIT.characters);

const kindOf = (argType: PlaygroundArgType, value: unknown, options: readonly unknown[]): ControlKind | null => {
  const control = argType.control ?? (argType.options ? 'select' : null);
  if (control === 'select') return isShortChoice(options) ? 'segmented' : 'select';
  if (control) return control;
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'text';
  return null;
};

export { kindOf };
