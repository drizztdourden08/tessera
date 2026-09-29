/* @layer renderer-components @kind util */
import type { SelectGroup, SelectOption } from '../Select.type';

const allOptionsOf = (groups: SelectGroup[] | undefined, options: SelectOption[] | undefined): SelectOption[] =>
  groups ? groups.flatMap((g) => g.options) : options ?? [];

export { allOptionsOf };
