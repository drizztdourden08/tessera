/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { joinPieces } from '../behavior/join-pieces';
import type { SubMenuJoinPiecesProps } from './SubMenuJoinPieces.type';

const SubMenuJoinPieces = (props: SubMenuJoinPiecesProps) => (
  <Span className="dropdown__join" data-side={props.join.side} aria-hidden="true">
    {joinPieces(props.join).map((piece) => <Span key={piece.key} className={piece.className} style={piece.style} />)}
  </Span>
);

export { SubMenuJoinPieces };
