/* @layer renderer-components @kind types */
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { ToolbarSide } from '../ToolbarDock.type';
import type { ToolbarDragLatest, ToolbarFrame } from './toolbar-drag.type';

type ToolbarKeyPick =
  | { kind: 'lane'; side: ToolbarSide; lane: number | 'new'; index: number; slot: number }
  | { kind: 'basket' };

type ToolbarKeyNote =
  | { kind: 'place'; side: ToolbarSide; index: number }
  | { kind: 'slot'; slot: number; count: number }
  | { kind: 'hide' };

interface ToolbarStop {
  lane: number | 'new';
  index: number;
}

type ToolbarKeyEnd = 'drop' | 'cancel';

interface ToolbarKeyResult {
  pick: ToolbarKeyPick;
  note: ToolbarKeyNote | null;
  end: ToolbarKeyEnd | null;
}

interface ToolbarKeySession {
  id: string;
  pick: ToolbarKeyPick;
  frame: ToolbarFrame;
}

type ToolbarWords = TesseraStrings['toolbars'];

interface ToolbarKeyLatest extends ToolbarDragLatest {
  words: ToolbarWords;
}

interface ToolbarKeyWiring {
  root: HTMLElement;
  press: (key: string) => boolean;
  cancel: () => void;
}

export type { ToolbarKeyEnd, ToolbarKeyLatest, ToolbarKeyNote, ToolbarKeyPick, ToolbarKeyResult, ToolbarKeySession, ToolbarKeyWiring, ToolbarStop, ToolbarWords };
