/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import { DEFAULT_HEADING_OFFSET, DEFAULT_SIZE } from '../Markdown.constants';
import type { MarkdownSettings } from '../Markdown.type';

const MarkdownContext = createContext<MarkdownSettings>({ headingOffset: DEFAULT_HEADING_OFFSET, size: DEFAULT_SIZE });

export { MarkdownContext };
