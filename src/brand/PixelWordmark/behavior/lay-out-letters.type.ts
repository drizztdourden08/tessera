/* @layer renderer-components @kind types */
interface PlacedLetter {
  rows: readonly string[];
  x: number;
  y: number;
}

interface LetterLayout {
  letters: readonly PlacedLetter[];
  width: number;
  height: number;
}

export type { LetterLayout, PlacedLetter };
