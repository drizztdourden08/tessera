/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { DocumentTabAddProps } from '../DocumentTabs.type';

const DocumentTabAdd = ({ onAdd }: DocumentTabAddProps) => {
  const { documentTabs } = useTesseraStrings();
  return (
    <Box className="document-tabs__add">
      <IconButton size="xs" variant="ghost" label={documentTabs.add} onClick={onAdd}>
        <Icon name="plus" />
      </IconButton>
    </Box>
  );
};

export { DocumentTabAdd };
