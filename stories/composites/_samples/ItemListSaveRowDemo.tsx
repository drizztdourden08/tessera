/* @layer stories @kind component */
import { useState } from 'react';
import { DateText, ItemList } from '../../../src/composites';
import type { ItemListRowState } from '../../../src/composites';
import { Box, Card, Icon, IconButton, Image, Text } from '../../../src/primitives';
import { SHOT_SAVES } from './save-shot-samples.constants';
import type { ItemListSaveRowDemoProps } from './item-list-save-row-demo.type';
import type { ShotSave } from './save-samples.type';

const idOf = (save: ShotSave) => save.id;
const nameOf = (save: ShotSave) => save.name;

const ItemListSaveRowDemo = ({ saves: first = SHOT_SAVES, selectedId: picked = 'q2', maxRows }: ItemListSaveRowDemoProps) => {
  const [saves, setSaves] = useState(first);
  const [selectedId, setSelectedId] = useState<string | null>(picked);
  const [note, setNote] = useState('Hover a row and press the pen, or press F2, to rename it in place.');
  const rename = (id: string, name: string) => {
    setSaves((list) => list.map((save) => (save.id === id ? { ...save, name } : save)));
    setNote(`Renamed to ${name}.`);
  };
  const actions = (save: ShotSave, row: ItemListRowState) => (
    <Box className="item-list-story__save-actions">
      <IconButton size="sm" variant="ghost" label={`Load ${save.name}`} title={`Load ${save.name}`} tabIndex={row.tabIndex} onClick={() => setNote(`Loaded ${save.name}.`)}>
        <Icon name="play" />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={`Save over ${save.name}`} title={`Save over ${save.name}`} tabIndex={row.tabIndex} onClick={() => setNote(`Saved over ${save.name}.`)}>
        <Icon name="save" />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={`Export ${save.name}`} title={`Export ${save.name}`} tabIndex={row.tabIndex} onClick={() => setNote(`Exported ${save.name}.`)}>
        <Icon name="share-2" />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={`Delete ${save.name}`} title={`Delete ${save.name}`} tabIndex={row.tabIndex} onClick={() => setSaves((list) => list.filter((item) => item.id !== save.id))}>
        <Icon name="trash-2" />
      </IconButton>
    </Box>
  );
  return (
    <Card className="item-list-story item-list-story--switch">
      <ItemList
        title="Saves"
        items={saves}
        getId={idOf}
        getName={nameOf}
        render={(save) => ({
          media: <Image src={save.shot} alt={`Screenshot of ${save.name}`} fit="cover" pixelated />,
          meta: <DateText value={save.when} format="relative" />,
        })}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onRename={rename}
        renameInline
        maxRows={maxRows}
        rowActions={actions}
        actionVisibility="always"
      />
      <Text variant="caption" tone="dim">{note}</Text>
    </Card>
  );
};

export { ItemListSaveRowDemo };
