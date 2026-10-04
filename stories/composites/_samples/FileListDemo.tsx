/* @layer stories @kind component */
import { useState } from 'react';
import { FileList } from '../../../src/composites';
import { Box, Button, Icon, Strong } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { OUTPUT_FILES } from './file-samples.constants';

const FileListDemo = () => {
  const [last, setLast] = useState('none');
  return (
    <ValueReadout value={last}>
      <Box className="file-list-story">
        <Box className="file-list-story__head">
          <Strong>Output · 7 files · 23.0 MB</Strong>
          <Button size="sm" variant="secondary" icon={<Icon name="folder-open" />} onClick={() => setLast('Open folder')}>Open folder</Button>
        </Box>
        <FileList files={OUTPUT_FILES} label="Output" onOpen={(path) => setLast(`Open ${path}`)} onReveal={(path) => setLast(`Reveal ${path}`)} />
      </Box>
    </ValueReadout>
  );
};

export { FileListDemo };
