/* @layer stories @kind types */
import type { PatternLists, PatternRuleMessage, PatternSlotConfigs, PatternValue } from '../../../src/composites';

interface PatternRulesCase {
  key: string;
  label: string;
  hint: string;
  pattern: string;
  initial: PatternValue;
  slots?: PatternSlotConfigs;
  lists?: PatternLists;
  validate?: (value: PatternValue) => PatternRuleMessage;
}

export type { PatternRulesCase };
