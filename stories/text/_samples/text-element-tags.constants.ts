/* @layer stories @kind data */
import type { TextTag } from '../../../src/primitives';

const SHOWN_TAGS = ['p', 'span', 'strong', 'em', 'code', 'mark', 'small', 'del', 'ins', 'abbr'] as const satisfies readonly TextTag[];

const CHANGE_TAGS = { added: 'ins', removed: 'del', moved: 'mark', note: 'small' } as const satisfies Readonly<Record<string, TextTag>>;

const CHANGES = [
  { kind: 'added', text: 'Hookshot logic for the Ice Palace' },
  { kind: 'removed', text: 'The old dark room rule' },
  { kind: 'moved', text: 'Bombos now sits under Items' },
  { kind: 'note', text: 'Saves from 0.2 still load' },
] as const;

export { CHANGE_TAGS, CHANGES, SHOWN_TAGS };
