/* @layer renderer-components @kind logic */
import { OPERATOR_GLYPHS } from './operator-icon-glyphs.constants';
import type { ReactNode } from 'react';
import type { OperatorIcon } from '../../../data/filter/operators';

const glyphForOperatorIcon = (icon: OperatorIcon): ReactNode => OPERATOR_GLYPHS[icon];

export { glyphForOperatorIcon };
