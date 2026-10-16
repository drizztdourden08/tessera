/* @layer renderer-components @kind logic */
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsRowProps } from '../SettingsRow.type';
import type { OnOffWords } from './hint-rules.type';
import { lineHints } from './line-hints';

const restHints = (props: SettingsRowProps, words: OnOffWords): readonly Hint[] => {
  const { input, compact } = props;
  return input?.kind === 'toggle' && input.hints?.atRest === true && compact !== true ? lineHints(input, words) : [];
};

export { restHints };
