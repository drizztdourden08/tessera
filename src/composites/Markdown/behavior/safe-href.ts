/* @layer renderer-components @kind util */
import { LINK_PROTOCOLS } from '../Markdown.constants';

const safeHref = (url: string): string => (URL.canParse(url) && LINK_PROTOCOLS.has(new URL(url).protocol) ? url : '');

export { safeHref };
