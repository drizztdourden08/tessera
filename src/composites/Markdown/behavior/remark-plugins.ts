/* @layer renderer-components @kind util */
import type { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { RemarkPluginOptions } from '../Markdown.type';
import { dropTitle } from './drop-title';
import { linkIds } from './link-ids';

const remarkPlugins = (options: RemarkPluginOptions): NonNullable<Options['remarkPlugins']> => {
  const { hideTitle, rules, allowPaths } = options;
  return [remarkGfm, ...(hideTitle ? [dropTitle] : []), [linkIds, { rules, allowPaths }]];
};

export { remarkPlugins };
