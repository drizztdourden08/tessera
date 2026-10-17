/* @layer stories @kind component */
import { useState } from 'react';
import { ArmedIconButton, ListItemList, ListItemRow } from '../../../src/composites';
import { Box, Inline, Small } from '../../../src/primitives';
import { SAVE_SLOTS } from './save-slots.constants';
import type { SaveSlot } from './save-slots.type';

const SaveSlotRows = () => {
  const [slots, setSlots] = useState<readonly SaveSlot[]>(SAVE_SLOTS);
  const [last, setLast] = useState('Press a button once to arm it, then again to confirm.');

  const actions = (slot: SaveSlot) => (
    <Inline gap="2xs" align="center">
      <ArmedIconButton icon="load-state" tone="info" label={`Load ${slot.name}`} onConfirm={() => setLast(`Loaded ${slot.name}.`)} />
      <ArmedIconButton icon="save-state" tone="warning" label={`Overwrite ${slot.name}`} onConfirm={() => setLast(`Saved over ${slot.name}.`)} />
      <ArmedIconButton
        icon="trash-2"
        tone="danger"
        label={`Delete ${slot.name}`}
        onConfirm={() => {
          setSlots(slots.filter((other) => other.id !== slot.id));
          setLast(`Deleted ${slot.name}.`);
        }}
      />
    </Inline>
  );

  return (
    <Box className="story-column">
      <ListItemList heading="Save states" count={slots.length}>
        {slots.map((slot) => (
          <ListItemRow key={slot.id} name={slot.name} meta={slot.meta} actionVisibility="always" action={actions(slot)} />
        ))}
      </ListItemList>
      <Small tone="dim" role="status">{last}</Small>
    </Box>
  );
};

export { SaveSlotRows };
