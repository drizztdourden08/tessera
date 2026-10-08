/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import MarkdownTree from 'react-markdown';
import { Box } from '../../primitives/Box';
import { dropTitle } from './behavior/drop-title';
import { MarkdownContext } from './behavior/markdown-context';
import { markdownParts } from './behavior/markdown-parts';
import { safeHref } from './behavior/safe-href';
import { DEFAULT_HEADING_OFFSET } from './Markdown.constants';
import type { MarkdownProps } from './Markdown.type';
import './Markdown.css';

const Markdown = (props: MarkdownProps) => {
  const { children, source, onLink, headingOffset = DEFAULT_HEADING_OFFSET, hideTitle = false, size = 'md', className } = props;
  const settings = useMemo(() => ({ onLink, headingOffset }), [onLink, headingOffset]);
  return (
    <MarkdownContext value={settings}>
      <Box className={className ? `markdown ${className}` : 'markdown'} data-size={size}>
        <MarkdownTree components={markdownParts} skipHtml urlTransform={safeHref} remarkPlugins={hideTitle ? [dropTitle] : undefined}>
          {children ?? source}
        </MarkdownTree>
      </Box>
    </MarkdownContext>
  );
};

export { Markdown };
