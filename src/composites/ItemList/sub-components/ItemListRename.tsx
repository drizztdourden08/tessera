/* @layer renderer-components @kind component */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ItemListRenameProps } from '../ItemList.type';

const ItemListRename = (props: ItemListRenameProps) => {
  const { id, name, onEnd } = props;
  const { lists } = useTesseraStrings();
  const [draft, setDraft] = useState(name);
  const next = draft.trim();
  const commit = () => {
    if (next) onEnd(id, next === name ? null : next);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') commit();
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    onEnd(id, null);
  };
  return (
    <Box className="item-list__rename" role="listitem">
      <TextInput
        className="item-list__rename-input"
        aria-label={lists.newName}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={(event) => event.target.select()}
        autoFocus
      />
      <IconButton size="sm" variant="primary" label={lists.keepName} title={lists.keepName} disabled={!next} onClick={commit}>
        <Icon name="check" />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={lists.cancelRename} title={lists.cancelRename} onClick={() => onEnd(id, null)}>
        <Icon name="x" />
      </IconButton>
    </Box>
  );
};

export { ItemListRename };
