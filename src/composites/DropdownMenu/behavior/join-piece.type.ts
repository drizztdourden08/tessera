/* @layer renderer-components @kind types */
import type { CSSProperties } from 'react';

type JoinPieceStyle = CSSProperties & Partial<Record<'--tunnel-fillet' | '--tunnel-open', string>>;

interface JoinPiece {
  key: string;
  className: string;
  style: JoinPieceStyle;
}

export type { JoinPiece };
