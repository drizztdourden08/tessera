/* @layer renderer-components @kind util */
import type { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { dropTitle } from './drop-title';

const remarkPlugins = (hideTitle: boolean): NonNullable<Options['remarkPlugins']> => (hideTitle ? [remarkGfm, dropTitle] : [remarkGfm]);

export { remarkPlugins };
