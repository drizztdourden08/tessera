/* @layer renderer-components @kind logic */
import type { SelectOption } from '../../../../../primitives/Select/Select.type';
import type { TesseraStrings } from '../../../../../primitives/strings/tessera-strings.type';
import type { WindowGroup } from '../../../Widget.type';
import { NO_GROUP, NUMBERED_GROUPS } from '../WidgetOptions.constants';

const numberedGroups = (words: TesseraStrings['widgets']): WindowGroup[] =>
  Array.from({ length: NUMBERED_GROUPS }, (_, index) => ({ id: `group-${index + 1}`, label: words.groupNumbered(index + 1) }));

const groupOptions = (groups: readonly WindowGroup[] | undefined, words: TesseraStrings['widgets']): SelectOption[] => [
  { value: NO_GROUP, label: words.groupNone },
  ...(groups ?? numberedGroups(words)).map((group) => ({ value: group.id, label: group.label })),
];

export { groupOptions };
