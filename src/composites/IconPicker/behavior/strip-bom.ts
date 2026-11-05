/* @layer renderer-components @kind logic */
import { BOM } from './is-svg-text.constants';

const stripBom = (text: string): string => (text.startsWith(BOM) ? text.slice(BOM.length) : text);

export { stripBom };
