/* @layer stories @kind component */
import { useState } from 'react';
import { FactsPanel, ListItemList, ListItemRow } from '../../../../src/composites';
import { Box, Button, Icon, SectionHeader } from '../../../../src/primitives';
import { PROFILE_ROWS, ROM_NAME } from '../rotp-profiles';

const ProfilesBody = () => {
  const [selected, setSelected] = useState(PROFILE_ROWS[0]?.name ?? '');
  const row = PROFILE_ROWS.find((entry) => entry.name === selected);
  return (
    <Box className="hub-window__panes">
      <Box surface="sunken" className="hub-window__list">
        <Button variant="primary" fullWidth icon={<Icon name="plus" />}>New Profile</Button>
        <ListItemList label="Profiles">
          {PROFILE_ROWS.map((entry) => (
            <ListItemRow
              key={entry.name}
              icon={<Icon name={entry.icon} />}
              name={entry.name}
              meta={entry.meta}
              selected={entry.name === selected}
              onClick={() => setSelected(entry.name)}
            />
          ))}
        </ListItemList>
      </Box>
      <Box className="hub-window__detail">
        {row && (
          <>
            <SectionHeader title={row.name} subtitle={row.meta} />
            <FactsPanel groups={[[{ label: 'ROM', value: ROM_NAME }, { label: 'Mode', value: row.meta.split(',')[0] ?? '' }, { label: 'Last played', value: row.aside }]]} />
          </>
        )}
      </Box>
    </Box>
  );
};

export { ProfilesBody };
