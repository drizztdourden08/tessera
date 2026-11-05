/* @layer renderer-components @kind logic */
import { PROLOG, SVG_ROOT } from './is-svg-text.constants';
import { stripBom } from './strip-bom';

const isSvgText = (text: string): boolean => SVG_ROOT.test(stripBom(text).trim().replace(PROLOG, ''));

export { isSvgText };
