/* @layer renderer-components @kind util */
import { NUMBER_TEXT } from './label-rule.constants';

const parseNumber = (text: string): number | null => (NUMBER_TEXT.test(text.trim()) ? Number(text.trim()) : null);

export { parseNumber };
