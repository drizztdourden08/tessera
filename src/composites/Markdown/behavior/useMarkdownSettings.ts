/* @layer renderer-components @kind hook */
import { use } from 'react';
import type { MarkdownSettings } from '../Markdown.type';
import { MarkdownContext } from './markdown-context';

const useMarkdownSettings = (): MarkdownSettings => use(MarkdownContext);

export { useMarkdownSettings };
