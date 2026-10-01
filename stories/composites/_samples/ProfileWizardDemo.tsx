/* @layer stories @kind story */
import { useState } from 'react';
import { Box, Checkbox } from '../../../src/primitives';
import { RotpProfilesScreen } from './RotpProfilesScreen';
import { RotpWindow } from './RotpWindow';

const ProfileWizardDemo = () => {
  const [failNext, setFailNext] = useState(true);
  return (
    <Box className="profile-wizard-story">
      <Checkbox checked={failNext} onChange={setFailNext} label="Make the next Create profile fail, to see the error" />
      <RotpWindow profiles={<RotpProfilesScreen failNext={failNext} onFailUsed={() => setFailNext(false)} />} />
    </Box>
  );
};

export { ProfileWizardDemo };
