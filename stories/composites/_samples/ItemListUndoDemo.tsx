/* @layer stories @kind component */
import { useState } from 'react';
import { ItemList } from '../../../src/composites';
import type { ItemListRowState } from '../../../src/composites';
import { Card, Icon, IconButton, Text } from '../../../src/primitives';
import { SAMPLE_SAVES, UNDO_FOR } from './save-samples.constants';
import type { ItemListUndoDemoProps, SampleSave } from './save-samples.type';

const idOf = (save: SampleSave) => save.id;
const nameOf = (save: SampleSave) => save.name;
const whenOf = (save: SampleSave) => save.when;

const ItemListUndoDemo = ({ meta = whenOf }: ItemListUndoDemoProps) => {
  const [saves, setSaves] = useState(SAMPLE_SAVES);
  const [selectedId, setSelectedId] = useState<string | null>('s2');
  const [note, setNote] = useState('Nothing loaded or deleted yet.');
  const remove = (id: string) => {
    setNote(`${saves.find((save) => save.id === id)?.name ?? id} is deleted for good.`);
    setSaves((list) => list.filter((save) => save.id !== id));
  };
  const rename = (id: string, name: string) => setSaves((list) => list.map((save) => (save.id === id ? { ...save, name } : save)));
  const load = (save: SampleSave, row: ItemListRowState) => (
    <IconButton size="sm" variant="ghost" label={`Load ${save.name}`} title={`Load ${save.name}`} tabIndex={row.tabIndex} onClick={() => setNote(`Loaded ${save.name}.`)}>
      <Icon name="play" />
    </IconButton>
  );
  return (
    <Card className="item-list-story item-list-story--switch">
      <ItemList
        title="Saves"
        items={saves}
        getId={idOf}
        getName={nameOf}
        render={(save) => ({ meta: meta(save), icon: <Icon name="save" /> })}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onRename={rename}
        onDelete={remove}
        undoDelete={UNDO_FOR}
        deleteKey
        rowActions={load}
      />
      <Text variant="caption" tone="dim">{note}</Text>
    </Card>
  );
};

export { ItemListUndoDemo };
