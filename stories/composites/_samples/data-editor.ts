/* @layer stories @kind data */
import type {
  IdRefOption, NumberBounds, ReferencedByHit, TagCreateResult,
} from '../../../src/composites/RecordEditor';
import type { FieldDescriptor } from '../../../src/data';
import { HINTS } from './data-hints';
import { PLAYERS } from './data-players';
import type { PlayerRow } from './data-players';

const SLOT_OPTIONS: readonly IdRefOption[] = PLAYERS.map((player) => ({
  value: player.id, label: `${player.name} (${player.game})`, description: player.id,
}));

const resolvePlayerOptions = (targetKind: string, field: FieldDescriptor): readonly IdRefOption[] =>
  targetKind === 'slot' && field.path !== 'id' ? SLOT_OPTIONS : [];

const TAG_VOCABULARY = ['host', 'async', 'streamer', 'spectator', 'practice', 'first run'];

const resolveTags = (): readonly string[] => TAG_VOCABULARY;

const createTag = (key: string): Promise<TagCreateResult> => {
  if (key.length > 24) return Promise.resolve({ success: false, error: 'Tags are 24 characters at most.' });
  TAG_VOCABULARY.push(key);
  return Promise.resolve({ success: true, id: key });
};

const resolvePlayerBounds = (path: string, record: unknown): NumberBounds | undefined => {
  const player = record as PlayerRow;
  if (path === 'checked') return { min: 0, max: player.total, step: 1 };
  if (path === 'total' || path === 'hintPoints') return { min: 0, step: 1 };
  if (path === 'connection.ping') return { min: 0, max: 999 };
  return undefined;
};

const hintsFor = (slotId: string): readonly ReferencedByHit[] =>
  HINTS.flatMap((hint) => {
    const hits: ReferencedByHit[] = [];
    if (hint.finder === slotId) hits.push({ kind: 'hint', id: hint.id, field: 'finder', label: hint.item });
    if (hint.receiver === slotId) hits.push({ kind: 'hint', id: hint.id, field: 'receiver', label: hint.item });
    return hits;
  });

const pretendSave = (ms: number): Promise<void> => new Promise((resolve) => { setTimeout(resolve, ms); });

export { createTag, hintsFor, pretendSave, resolvePlayerBounds, resolvePlayerOptions, resolveTags };
