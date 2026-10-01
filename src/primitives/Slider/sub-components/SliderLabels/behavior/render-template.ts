/* @layer renderer-components @kind util */
import { percentOf } from '../../../behavior/percent-of';
import type { SliderScale } from '../../../behavior/slider-scale.type';
import { applyOperator } from './apply-operator';
import { chooseForm } from './choose-form';
import { formatNumber } from './format-number';
import type { TemplatePart } from './label-rule.type';

const renderPart = (part: TemplatePart, value: number, scale: SliderScale): string => {
  switch (part.kind) {
    case 'text': return part.text;
    case 'stop': return scale.stops?.[Math.round(value)] ?? formatNumber(value, null);
    case 'choice': return chooseForm(part.forms, value);
    case 'number': {
      const source = part.source === 'p' ? percentOf(value, scale) : value;
      return formatNumber(applyOperator(source, part.operator, part.operand), part.pattern);
    }
  }
};

const renderTemplate = (parts: readonly TemplatePart[], value: number, scale: SliderScale): string =>
  parts.map((part) => renderPart(part, value, scale)).join('');

export { renderTemplate };
