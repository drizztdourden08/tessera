/* @layer renderer-components @kind types */
type EscapeLevel = 'drag' | 'popover' | 'menu' | 'dialog' | 'screen';

type EscapeDocument = Pick<Document, 'addEventListener' | 'removeEventListener'>;

type EscapeHolds = (target: EventTarget | null) => boolean;

interface EscapeEntry {
  level: EscapeLevel;
  onEscape: () => void;
  holds?: EscapeHolds;
}

interface EscapeLayer {
  level: EscapeLevel;
  onEscape: () => void;
  active?: boolean;
}

interface EscapeStack {
  depth: () => number;
  top: () => EscapeLevel | null;
}

export type { EscapeDocument, EscapeEntry, EscapeHolds, EscapeLayer, EscapeLevel, EscapeStack };
