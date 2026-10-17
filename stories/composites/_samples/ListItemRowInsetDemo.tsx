/* @layer stories @kind component */
import { ListItemList, ListItemRow } from '../../../src/composites';
import { Box, Button, DensityScope, Icon, Text } from '../../../src/primitives';
import { INSET_PROFILES, INSET_STATES } from './list-row-inset.constants';

const ProfileColumn = () => (
  <Box className="list-item-row-story__inset-column">
    <Button variant="primary" fullWidth icon={<Icon name="plus" />}>New Profile</Button>
    <ListItemList label="Profiles">
      {INSET_PROFILES.map((profile, index) => (
        <ListItemRow key={profile.name} icon={<Icon name="user" />} name={profile.name} meta={profile.meta} selected={index === 0} onClick={() => undefined} />
      ))}
    </ListItemList>
  </Box>
);

const StateColumn = () => (
  <Box className="list-item-row-story__inset-column">
    <Button variant="secondary" fullWidth icon={<Icon name="plus" />}>New state</Button>
    {INSET_STATES.map((group) => (
      <ListItemList key={group.heading} heading={group.heading} count={group.rows.length}>
        {group.rows.map((row) => (
          <ListItemRow key={row.name} name={row.name} columns={[{ primary: row.frames, align: 'end' }]} onClick={() => undefined} />
        ))}
      </ListItemList>
    ))}
  </Box>
);

const ListItemRowInsetDemo = () => (
  <Box className="list-item-row-story__inset">
    <Box className="story-column">
      <Text className="story-label">Usual size</Text>
      <ProfileColumn />
    </Box>
    <Box className="story-column">
      <Text className="story-label">Compact panel</Text>
      <DensityScope density="compact">
        <StateColumn />
      </DensityScope>
    </Box>
  </Box>
);

export { ListItemRowInsetDemo };
