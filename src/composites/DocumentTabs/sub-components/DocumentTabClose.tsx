/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { CLOSE_ICON_SIZE } from '../DocumentTabs.constants';
import type { DocumentTabCloseProps } from '../DocumentTabs.type';
import './DocumentTabClose.css';

const DocumentTabClose = ({ tab, hot, onClose }: DocumentTabCloseProps) => {
  const { documentTabs } = useTesseraStrings();
  return (
    <Box
      className="document-tabs__slot"
      data-close-key={tab.id}
      data-unsaved={tab.unsaved ? 'yes' : undefined}
      data-hot={hot ? 'yes' : undefined}
    >
      <Box className="document-tabs__end">
        {tab.unsaved && <Box className="document-tabs__dot" aria-hidden />}
        <IconButton
          variant="ghost"
          size="xs"
          label={documentTabs.close(tab.title)}
          tabIndex={-1}
          className="document-tabs__close"
          onClick={() => onClose(tab.id)}
        >
          <Icon name="x" size={CLOSE_ICON_SIZE} />
        </IconButton>
      </Box>
    </Box>
  );
};

export { DocumentTabClose };
