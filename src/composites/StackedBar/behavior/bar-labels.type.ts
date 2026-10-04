/* @layer renderer-components @kind types */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { StackedBarRow } from '../StackedBar.type';
import type { BarTracks } from './bar-tracks.type';

interface BarLabels {
  freeTip: string | null;
  summary: string | undefined;
}

interface BarLabelsInput {
  rows: readonly StackedBarRow[];
  tracks: BarTracks;
  label: string | undefined;
  format: (value: number) => string;
  strings: TesseraStrings['charts'];
}

export type { BarLabels, BarLabelsInput };
