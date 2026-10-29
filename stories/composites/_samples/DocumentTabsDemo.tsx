/* @layer stories @kind component */
import { DocumentTabs } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { DOCUMENT_SETS } from './document-tabs-story.constants';
import type { DocumentTabsDemoProps } from './document-tabs-story.type';
import { useDocuments } from './useDocuments';

const DocumentTabsDemo = ({ documents = 'three', menu = false, narrow = false, showOrder = false, look = 'flat' }: DocumentTabsDemoProps) => {
  const { tabs, activeId, activate, close, move } = useDocuments(DOCUMENT_SETS[documents]);
  const active = tabs.find((tab) => tab.id === activeId);
  return (
    <Box className={`document-tabs-story__frame${narrow ? ' document-tabs-story__frame--narrow' : ''}`}>
      <DocumentTabs label="Open drawings" tabs={tabs} activeId={activeId} onActivate={activate} onClose={close} onMove={move} overflowMenu={menu} look={look} />
      <Text className="story-label">{active ? `Editing ${active.title}` : 'No document is open.'}</Text>
      {showOrder && <Text className="story-label">{`Order: ${tabs.map((tab) => tab.title).join(', ')}`}</Text>}
    </Box>
  );
};

export { DocumentTabsDemo };
