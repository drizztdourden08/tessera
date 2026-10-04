/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Combobox } from '../../../primitives/Combobox';
import { Icon } from '../../../primitives/Icon';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { KeyValueAddProps } from '../KeyValueEditor.type';

const KeyValueAdd = ({ keys, used, placeholder, disabled, onAdd }: KeyValueAddProps) => {
  const { options } = useTesseraStrings();
  const [draft, setDraft] = useState('');
  const free = keys?.filter((key) => !used.includes(key));
  const ready = draft.trim() !== '' && !used.includes(draft.trim());
  const add = () => {
    if (!ready) return;
    onAdd(draft.trim());
    setDraft('');
  };
  const shown = placeholder ?? (keys?.length ? options.addKey(keys.length) : options.addFree);
  return (
    <Box className="key-value-editor__add">
      {free ? (
        <Combobox
          items={free} value={draft || null} onChange={(key) => setDraft(key ?? '')} placeholder={shown} aria-label={shown} disabled={disabled}
          min={0} className="key-value-editor__key"
        />
      ) : (
        <TextInput
          value={draft} placeholder={shown} aria-label={shown} disabled={disabled} className="key-value-editor__key"
          onChange={(event) => setDraft(event.target.value)} onEnter={add}
        />
      )}
      <Button size="sm" variant="secondary" icon={<Icon name="plus" />} disabled={disabled === true || !ready} onClick={add}>{options.add}</Button>
    </Box>
  );
};

export { KeyValueAdd };
