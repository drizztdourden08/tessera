/* @layer renderer-components @kind util */
import type { SelectGroup, SelectOption } from '../Select.type';

const allOptionsOf = (
  groups: readonly SelectGroup[] | undefined,
  options: readonly SelectOption[] | undefined,
): readonly SelectOption[] => [...(options ?? []), ...(groups?.flatMap((group) => group.options) ?? [])];

export { allOptionsOf };
