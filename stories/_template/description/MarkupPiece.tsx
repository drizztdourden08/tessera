/* @layer stories @kind component */
import { Code, Em, Link, Shortcut, Strong } from '../../../src/primitives';
import { GALLERY_ROUTE } from './description.constants';
import type { MarkupLinkProps, MarkupPieceProps, MarkupToken } from './description.type';
import { galleryHref } from './gallery-href';

const pieces = (tokens: readonly MarkupToken[]) =>
  tokens.map((token, index) => <MarkupPiece key={index} token={token} />);

const PageLink = (props: MarkupLinkProps) => {
  const href = galleryHref(props.href);
  const code = <Code>{props.text}</Code>;
  return href === null ? code : <Link href={href} target="_top" className="markup__page">{code}</Link>;
};

const TextLink = (props: MarkupLinkProps) => (props.href.startsWith(GALLERY_ROUTE)
  ? <Link href={props.href} target="_top">{props.text}</Link>
  : <Link href={props.href} external>{props.text}</Link>);

const MarkupPiece = (props: MarkupPieceProps) => {
  const { token } = props;
  switch (token.kind) {
    case 'code': return <Code>{token.text}</Code>;
    case 'strong': return <Strong>{pieces(token.children)}</Strong>;
    case 'em': return <Em>{pieces(token.children)}</Em>;
    case 'keys': return <Shortcut keys={token.keys} />;
    case 'page': return <PageLink text={token.name} href={token.path} />;
    case 'link': return <TextLink text={token.text} href={token.href} />;
    case 'text': return token.text;
  }
};

export { MarkupPiece };
