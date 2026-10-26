/* @layer stories @kind component */
import { useState } from 'react';
import { Button, ButtonRow, Field, TextInput } from '../../../src/primitives';
import type { PlayerRow } from './data-players';

interface DataTableDetailNameProps {
  player: PlayerRow;
  onSave: (id: string, name: string) => void;
  onCancel: () => void;
}

const DataTableDetailName = ({ player, onSave, onCancel }: DataTableDetailNameProps) => {
  const [name, setName] = useState(player.name);

  return (
    <ButtonRow>
      <Field label="Name" inline>
        <TextInput
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          onEnter={(value) => onSave(player.id, value)}
        />
      </Field>
      <Button size="sm" variant="primary" onClick={() => onSave(player.id, name)}>Save</Button>
      <Button size="sm" onClick={onCancel}>Cancel</Button>
    </ButtonRow>
  );
};

export { DataTableDetailName };
