/* @layer renderer-components @kind component */
import { Span } from '../../../primitives/text-elements';
import { joinPieces } from '../behavior/join-pieces';
import type { SubMenuJoinPiecesProps } from './SubMenuJoinPieces.type';

const SubMenuJoinPieces = (props: SubMenuJoinPiecesProps) => {
  const { join, areaRef, bodyRef } = props;
  return (
    <>
      {join && <Span className="dropdown__tunnel-shadow" aria-hidden="true" />}
      <Span className="dropdown__tunnel" data-side={join?.side} aria-hidden="true">
        {join && joinPieces(join).map((piece) => (
          <Span key={piece.key} ref={piece.key === 'body' ? bodyRef : undefined} className={piece.className} style={piece.style} />
        ))}
        <Span ref={areaRef} className="dropdown__safe-area" />
      </Span>
    </>
  );
};

export { SubMenuJoinPieces };
