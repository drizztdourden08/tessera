/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsInput } from '../SettingsRow.type';
import { LINE_HINTS } from './hint-rules.constants';
import type { OnOffWords } from './hint-rules.type';

const lineHints = (input: SettingsInput, words: OnOffWords): readonly Hint[] =>
  (LINE_HINTS[input.kind] as (given: SettingsInput, said: OnOffWords) => readonly Hint[])(input, words);

export { lineHints };
