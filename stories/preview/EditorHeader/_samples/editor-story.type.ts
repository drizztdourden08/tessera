/* @layer stories @kind types */
import type { EditorBarEdge, SaveStateKind } from '../EditorBar.type';

type EditorArgs = {
  name: string;
  state: SaveStateKind;
  context: boolean;
  back: boolean;
  edge: EditorBarEdge;
};

export type { EditorArgs };
