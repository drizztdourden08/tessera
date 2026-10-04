/* @layer stories @kind component */
import { ManagedList } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import type { ManagedListCreateDemoProps } from './profile-samples.type';
import { useSampleProfiles } from './useSampleProfiles';

const ManagedListCreateDemo = ({ firstRun = false }: ManagedListCreateDemoProps) => {
  const sample = useSampleProfiles(firstRun);
  return (
    <Box className="managed-list-story">
      <ManagedList {...sample.list} onSelect={sample.pick} />
    </Box>
  );
};

export { ManagedListCreateDemo };
