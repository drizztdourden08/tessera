/* @layer renderer-components @kind util */
import type { LabelBox } from '../../value-rule/value-rule.type';
import type { ScaleOrientation } from '../ScaleLabels.type';

const labelBoxes = (texts: readonly HTMLElement[], orientation: ScaleOrientation): LabelBox[] =>
  texts.map((text) => {
    const rect = text.getBoundingClientRect();
    return orientation === 'vertical' ? { start: -rect.bottom, end: -rect.top } : { start: rect.left, end: rect.right };
  });

export { labelBoxes };
