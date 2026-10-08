/* @layer renderer-components @kind logic */
import { createContext } from 'react';
import { DEFAULT_HEADING_OFFSET } from '../Markdown.constants';
import type { MarkdownSettings } from '../Markdown.type';

const MarkdownContext = createContext<MarkdownSettings>({ headingOffset: DEFAULT_HEADING_OFFSET });

export { MarkdownContext };
