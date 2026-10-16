/* @layer stories @kind component */
import { useState } from 'react';
import { ItemList, ToastStack, toast } from '../../../src/composites';
import type { ItemListRowState } from '../../../src/composites';
import { Card, Icon, IconButton, Text } from '../../../src/primitives';
import { SAMPLE_SAVES, UNDO_FOR } from './save-samples.constants';
import type { SampleSave } from './save-samples.type';

const idOf = (save: SampleSave) => save.id;
const nameOf = (save: SampleSave) => save.name;

const ItemListUndoStackDemo = () => {
  const [saves, setSaves] = useState(SAMPLE_SAVES);
  const [selectedId, setSelectedId] = useState<string | null>('s2');
  const [playing, setPlaying] = useState('Hookshot in hand');
  const put = (next: SampleSave) => setSaves((list) => list.map((save) => (save.id === next.id ? next : save)));

  const load = (save: SampleSave) => {
    const before = playing;
    setPlaying(save.name);
    toast({ id: 'save-loaded', message: `Loaded ${save.name}.`, duration: UNDO_FOR, undo: () => setPlaying(before) });
  };
  const saveOver = (save: SampleSave) => {
    put({ ...save, when: `Just now, from ${playing}` });
    toast({ id: `saved-over-${save.id}`, message: `Saved over ${save.name}.`, duration: UNDO_FOR, undo: () => put(save) });
  };
  const rowActions = (save: SampleSave, row: ItemListRowState) => (
    <>
      <IconButton size="sm" variant="ghost" label={`Load ${save.name}`} title={`Load ${save.name}`} tabIndex={row.tabIndex} onClick={() => load(save)}>
        <Icon name="play" />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={`Save over ${save.name}`} title={`Save over ${save.name}`} tabIndex={row.tabIndex} onClick={() => saveOver(save)}>
        <Icon name="save" />
      </IconButton>
    </>
  );

  return (
    <Card className="item-list-story item-list-story--switch">
      <ItemList
        title="Saves"
        items={saves}
        getId={idOf}
        getName={nameOf}
        render={(save) => ({ meta: save.when, icon: <Icon name="save" /> })}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onDelete={(id) => setSaves((list) => list.filter((save) => save.id !== id))}
        undoDelete={UNDO_FOR}
        deleteKey
        rowActions={rowActions}
      />
      <Text variant="caption" role="status">{`Playing from ${playing}`}</Text>
      <Text variant="caption" tone="dim">Load, save over or delete, then press Ctrl+Z: each press undoes the latest, deletes while focus is in the list.</Text>
      <ToastStack />
    </Card>
  );
};

export { ItemListUndoStackDemo };
