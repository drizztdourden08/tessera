/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import MarkdownTree from 'react-markdown';
import { Box } from '../../primitives/Box';
import { MarkdownContext } from './behavior/markdown-context';
import { markdownParts } from './behavior/markdown-parts';
import { remarkPlugins } from './behavior/remark-plugins';
import { urlTransformOf } from './behavior/url-transform';
import { DEFAULT_HEADING_OFFSET } from './Markdown.constants';
import type { MarkdownProps } from './Markdown.type';
import './Markdown.css';

const Markdown = (props: MarkdownProps) => {
  const { children, source, onLink, headingOffset = DEFAULT_HEADING_OFFSET, hideTitle = false, size = 'md', images, linkIds, className } = props;
  const settings = useMemo(() => ({ onLink, headingOffset, size, images }), [onLink, headingOffset, size, images]);
  const allowPaths = onLink !== undefined;
  const plugins = useMemo(() => remarkPlugins({ hideTitle, rules: [linkIds ?? []].flat(), allowPaths }), [hideTitle, linkIds, allowPaths]);
  return (
    <MarkdownContext value={settings}>
      <Box className={className ? `markdown ${className}` : 'markdown'} data-size={size}>
        <MarkdownTree components={markdownParts} skipHtml urlTransform={urlTransformOf(allowPaths)} remarkPlugins={plugins}>
          {children ?? source}
        </MarkdownTree>
      </Box>
    </MarkdownContext>
  );
};

export { Markdown };
