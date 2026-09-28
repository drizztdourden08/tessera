/* @layer renderer-components @kind data */
import { createElement } from 'react';
import { Glyph } from '../../../primitives/Icon';
import type { ReactNode } from 'react';
import type { OperatorIcon } from '../../../data/filter/operators';

const OPERATOR_GLYPHS: Record<OperatorIcon, ReactNode> = {
  equals: '=',
  'not-equals': '!=',
  greater: '>',
  'greater-eq': '>=',
  less: '<',
  'less-eq': '<=',
  between: createElement(Glyph, { name: 'widen' }),
  contains: '*=',
  'starts-with': '^=',
  'ends-with': '$=',
  'is-empty': '{}',
  'is-not-empty': '!{}',
  'any-of': 'in',
  'none-of': '!in',
  'is-true': createElement(Glyph, { name: 'check' }),
  'is-false': createElement(Glyph, { name: 'close' }),
  'length-eq': '#=',
  'length-gt': '#>',
  'length-lt': '#<',
  'contains-value': '*=',
};

export { OPERATOR_GLYPHS };
