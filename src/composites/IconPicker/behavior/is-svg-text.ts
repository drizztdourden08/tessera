/* @layer renderer-components @kind logic */
import { BOM, PROLOG, SVG_ROOT } from './is-svg-text.constants';

const isSvgText = (text: string): boolean => SVG_ROOT.test(text.replace(BOM, '').trim().replace(PROLOG, ''));

export { isSvgText };
