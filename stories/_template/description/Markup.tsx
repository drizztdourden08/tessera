/* @layer stories @kind component */
import { MarkupPiece } from './MarkupPiece';
import type { MarkupProps } from './description.type';
import { parseMarkup } from './parse-markup';

const Markup = (props: MarkupProps) => (
  <>{parseMarkup(props.text).map((token, index) => <MarkupPiece key={index} token={token} />)}</>
);

export { Markup };
