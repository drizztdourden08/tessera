/* @layer renderer-components @kind util */
import { LAST_LINE_KEEPER } from '../CodeBlock.constants';

const shownCode = (text: string): string => (text.endsWith('\n') || text === '' ? `${text}${LAST_LINE_KEEPER}` : text);

export { shownCode };
