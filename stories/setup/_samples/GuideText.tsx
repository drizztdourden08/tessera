/* @layer stories @kind component */
import { Code, Link } from '../../../src/primitives';
import { GALLERY_ROUTE, GUIDE_LINK, GUIDE_PIECE } from './guide-text.constants';
import type { GuidePieceProps, GuideTextProps } from './GuideText.type';

const GuidePiece = (props: GuidePieceProps) => {
  const { piece } = props;
  if (piece.startsWith('`')) return <Code>{piece.slice(1, -1)}</Code>;
  const [, label, href] = GUIDE_LINK.exec(piece) ?? [];
  if (label === undefined || href === undefined) return piece;
  if (href.startsWith(GALLERY_ROUTE)) return <Link href={href} target="_top">{label}</Link>;
  return <Link href={href} external>{label}</Link>;
};

const GuideText = (props: GuideTextProps) => (
  <>{props.text.split(GUIDE_PIECE).map((piece, index) => <GuidePiece key={`${index}:${piece}`} piece={piece} />)}</>
);

export { GuideText };
