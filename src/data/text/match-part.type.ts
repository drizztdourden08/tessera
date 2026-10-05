/* @layer renderer-components @kind types */
interface MatchPart {
  text: string;
  match: boolean;
}

type TextRange = [start: number, end: number];

export type { MatchPart, TextRange };
