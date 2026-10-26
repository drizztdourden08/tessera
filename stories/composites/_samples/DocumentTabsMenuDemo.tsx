/* @layer stories @kind component */
import { useState } from 'react';
import { DocumentTabs } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { menuNote } from '../../_template/menu-note';
import { DOCUMENT_SETS } from './document-tabs-story.constants';
import { useDocuments } from './useDocuments';

const DocumentTabsMenuDemo = () => {
  const { tabs, activeId, activate, close, move, add } = useDocuments(DOCUMENT_SETS.three);
  const [note, setNote] = useState('Right click a tab, or focus it and press Menu or Shift+F10');
  return (
    <Box className="document-tabs-story__frame">
      <DocumentTabs
        label="Open drawings"
        tabs={tabs}
        activeId={activeId}
        onActivate={activate}
        onClose={close}
        onMove={move}
        onAdd={add}
        onTabContextMenu={(id, event) => setNote(menuNote(id, event))}
      />
      <Text className="story-label">{note}</Text>
    </Box>
  );
};

export { DocumentTabsMenuDemo };
