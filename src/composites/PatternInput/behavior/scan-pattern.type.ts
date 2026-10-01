/* @layer renderer-components @kind types */
type RawTokenKind = 'text' | 'brace' | 'bracket';

interface RawToken {
  kind: RawTokenKind;
  body: string;
  at: number;
}

interface ScanResult {
  tokens: RawToken[];
  problems: string[];
}

interface GroupEnd {
  close: number;
  body: string;
}

interface ScanState extends ScanResult {
  text: string;
  textAt: number;
}

export type { GroupEnd, RawToken, ScanResult, ScanState };
