/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { DocumentTabClosesProps } from '../DocumentTabs.type';
import { DocumentTabClose } from './DocumentTabClose';

const DocumentTabCloses = ({ tabs, hoverId, liveId, onClose }: DocumentTabClosesProps) => (
  <Box className="document-tabs__closes">
    {tabs.map((tab) => (
      <DocumentTabClose key={tab.id} tab={tab} hot={tab.id === hoverId || tab.id === liveId} onClose={onClose} />
    ))}
  </Box>
);

export { DocumentTabCloses };
