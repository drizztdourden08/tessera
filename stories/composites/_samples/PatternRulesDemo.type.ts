/* @layer stories @kind types */
import type { PatternRuleMessage, PatternSlotConfigs, PatternValue } from '../../../src/composites';

interface PatternRulesCase {
  key: string;
  label: string;
  hint: string;
  pattern: string;
  initial: PatternValue;
  slots?: PatternSlotConfigs;
  validate?: (value: PatternValue) => PatternRuleMessage;
}

export type { PatternRulesCase };
