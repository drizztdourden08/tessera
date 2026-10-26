/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import MarkdownTree from 'react-markdown';
import { Box } from '../../primitives/Box';
import { MarkdownContext } from './behavior/markdown-context';
import { classesOf } from './behavior/classes-of';
import { markdownParts } from './behavior/markdown-parts';
import { remarkPlugins } from './behavior/remark-plugins';
import { safeHref } from './behavior/safe-href';
import { DEFAULT_HEADING_OFFSET } from './Markdown.constants';
import type { MarkdownProps } from './Markdown.type';
import './Markdown.css';

const Markdown = (props: MarkdownProps) => {
  const { children, source, onLink, headingOffset = DEFAULT_HEADING_OFFSET, hideTitle = false, size = 'md', className } = props;
  const settings = useMemo(() => ({ onLink, headingOffset, size }), [onLink, headingOffset, size]);
  return (
    <MarkdownContext value={settings}>
      <Box className={classesOf(size, className)} data-size={size}>
        <MarkdownTree components={markdownParts} skipHtml urlTransform={safeHref} remarkPlugins={remarkPlugins(hideTitle)}>
          {children ?? source}
        </MarkdownTree>
      </Box>
    </MarkdownContext>
  );
};

export { Markdown };
