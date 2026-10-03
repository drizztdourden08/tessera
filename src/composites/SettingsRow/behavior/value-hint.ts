/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsInput } from '../SettingsRow.type';
import { VALUE_HINTS } from './hint-rules.constants';
import type { OnOffWords } from './hint-rules.type';

const valueHint = (input: SettingsInput, words: OnOffWords): Hint | undefined =>
  (VALUE_HINTS[input.kind] as (given: SettingsInput, said: OnOffWords) => Hint | undefined)(input, words);

export { valueHint };
