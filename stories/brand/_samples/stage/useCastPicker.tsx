/* @layer stories @kind hook */
import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Flex, SegmentedControl, Text, Toggle, ToggleGroup } from '../../../../src/primitives';
import { BRAND_OF, MASCOT_OPTIONS, NAME_OF } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';

interface CastMember {
  id: string;
  key: MascotKey;
  label: string;
  hidden: boolean;
}

interface CastPicker {
  members: readonly CastMember[];
  controls: ReactNode;
}

const COPIES = ['1', '2', '3'] as const;

/**
 * Which mascots are on the stage and how many of each, plus a shown toggle per mascot. Hiding is a state:
 * the mascot fades out through the engine and keeps its place, so showing it again fades it back in there.
 */
const useCastPicker = (initial: readonly MascotKey[] = ['sentri', 'flint', 'pelago']): CastPicker => {
  const [keys, setKeys] = useState<MascotKey[]>([...initial]);
  const [copies, setCopies] = useState<(typeof COPIES)[number]>('1');
  const [hidden, setHidden] = useState<string[]>([]);
  const members = useMemo<CastMember[]>(() => keys.flatMap((key) => Array.from({ length: Number(copies) }, (_, i) => {
    const id = copies === '1' ? key : `${key}-${i + 1}`;
    return { id, key, label: copies === '1' ? NAME_OF[key] : `${NAME_OF[key]} ${i + 1}`, hidden: hidden.includes(id) };
  })), [keys, copies, hidden]);
  const toggle = (id: string, shown: boolean) => setHidden((list) => (shown ? list.filter((h) => h !== id) : [...list, id]));
  const controls = (
    <Flex gap="md" align="center" wrap>
      <ToggleGroup label="On stage" value={keys} options={MASCOT_OPTIONS} onChange={(next) => setKeys(next as MascotKey[])} size="sm" />
      <SegmentedControl label="Of each" size="sm" value={copies} options={COPIES.map((c) => ({ value: c, label: c }))} onChange={setCopies} />
      <Text variant="caption">Shown:</Text>
      {members.map((m) => <Toggle key={m.id} size="sm" checked={!m.hidden} onChange={(on) => toggle(m.id, on)} label={m.label} />)}
    </Flex>
  );
  return { members, controls };
};

export { BRAND_OF, useCastPicker };
export type { CastMember };
