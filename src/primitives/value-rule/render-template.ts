/* @layer renderer-components @kind util */
import { percentAlong } from './percent-along';
import type { ValueScale } from './value-rule.type';
import { applyOperator } from './apply-operator';
import { chooseForm } from './choose-form';
import { formatNumber } from './format-number';
import type { TemplatePart } from './value-rule.type';

const renderPart = (part: TemplatePart, value: number, scale: ValueScale): string => {
  switch (part.kind) {
    case 'text': return part.text;
    case 'stop': return scale.stops?.[Math.round(value)] ?? formatNumber(value, null);
    case 'choice': return chooseForm(part.forms, value);
    case 'number': {
      const source = part.source === 'p' ? percentAlong(value, scale) : value;
      return formatNumber(applyOperator(source, part.operator, part.operand), part.pattern);
    }
  }
};

const renderTemplate = (parts: readonly TemplatePart[], value: number, scale: ValueScale): string =>
  parts.map((part) => renderPart(part, value, scale)).join('');

export { renderTemplate };
