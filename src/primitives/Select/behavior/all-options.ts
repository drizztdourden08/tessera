/* @layer renderer-components @kind util */
import type { SelectGroup, SelectOption } from '../Select.type';

const allOptionsOf = (
  groups: readonly SelectGroup[] | undefined,
  options: readonly SelectOption[] | undefined,
): readonly SelectOption[] => (groups ? groups.flatMap((group) => group.options) : options ?? []);

export { allOptionsOf };
