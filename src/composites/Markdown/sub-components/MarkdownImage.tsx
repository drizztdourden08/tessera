/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import type { MarkdownImageProps } from '../Markdown.type';

const MarkdownImage = ({ alt }: MarkdownImageProps) => (alt ? <Span className="markdown__image-text">{alt}</Span> : null);

export { MarkdownImage };
