/* @layer stories @kind component */
import { Code, Text, formatValueRule } from '../../../src/primitives';
import type { ValueScale } from '../../../src/primitives';

type RuleMarksProps = { rule: string; scale: ValueScale };

const RuleMarks = (props: RuleMarksProps) => {
  const { rule, scale } = props;
  const { marks, error } = formatValueRule(rule, scale);
  if (error !== null) return <Text className="story-label">{error}</Text>;
  return <Code>{marks.length === 0 ? 'no marks' : marks.map((mark) => `${mark.value}: ${mark.text}`).join(', ')}</Code>;
};

export { RuleMarks };
