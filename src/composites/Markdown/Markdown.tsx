/* @layer renderer-components @kind component */
import { useMemo } from 'react';
import MarkdownTree from 'react-markdown';
import { Box } from '../../primitives/Box';
import { MarkdownContext } from './behavior/markdown-context';
import { classesOf } from './behavior/classes-of';
import { markdownParts } from './behavior/markdown-parts';
import { remarkPlugins } from './behavior/remark-plugins';
import { stripUnsafeChars } from './behavior/strip-unsafe-chars';
import { urlTransformOf } from './behavior/url-transform';
import { DEFAULT_HEADING_OFFSET } from './Markdown.constants';
import type { MarkdownProps } from './Markdown.type';
import './Markdown.css';

const Markdown = (props: MarkdownProps) => {
  const { children, source, onLink, headingOffset = DEFAULT_HEADING_OFFSET, hideTitle = false, size = 'md', images, onImage, linkIds, smartTimes = false, className } = props;
  const settings = useMemo(() => ({ onLink, headingOffset, size, images, onImage }), [onLink, headingOffset, size, images, onImage]);
  const allowPaths = onLink !== undefined;
  const plugins = useMemo(() => remarkPlugins({ hideTitle, rules: [linkIds ?? []].flat(), allowPaths, smart: smartTimes }), [hideTitle, linkIds, allowPaths, smartTimes]);
  const text = children ?? source;
  const clean = useMemo(() => (text === undefined ? undefined : stripUnsafeChars(text)), [text]);
  return (
    <MarkdownContext value={settings}>
      <Box className={classesOf(size, className)} data-size={size}>
        <MarkdownTree components={markdownParts} skipHtml urlTransform={urlTransformOf(allowPaths)} remarkPlugins={plugins}>
          {clean}
        </MarkdownTree>
      </Box>
    </MarkdownContext>
  );
};

export { Markdown };
