/* @layer stories @kind component */
import { ManagedList } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { useSampleProfiles } from './useSampleProfiles';

const ManagedListSwitchDemo = () => {
  const sample = useSampleProfiles(false);
  const active = sample.list.items.find((profile) => profile.id === sample.list.selectedId);
  return (
    <Box className="managed-list-story managed-list-story--switch">
      <ManagedList {...sample.list} onActivate={sample.pick} onRename={sample.rename} onDelete={sample.remove} actionVisibility="always" />
      <Text variant="caption">{active ? `Playing with ${active.name}` : 'No profile is active'}</Text>
    </Box>
  );
};

export { ManagedListSwitchDemo };
