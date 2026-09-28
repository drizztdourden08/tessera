/* @layer renderer-components @kind logic */
import type { ClickOutcome } from './resolve-click.type';

const resolveClick = <T extends string>(
  optionValue: T,
  activeValue: T,
  canDeselect: boolean,
): ClickOutcome<T> =>
  (optionValue === activeValue && canDeselect)
    ? { kind: 'deselect' }
    : { kind: 'change', value: optionValue };

export { resolveClick };
