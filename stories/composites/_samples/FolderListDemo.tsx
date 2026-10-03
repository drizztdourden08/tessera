/* @layer stories @kind component */
import { useState } from 'react';
import { InlineCreateForm } from '../../../src/composites';
import { Box, Card, Icon, Text } from '../../../src/primitives';

const START_FOLDERS: readonly string[] = ['Drafts', 'Invoices', 'Meeting notes'];

const FolderListDemo = () => {
  const [folders, setFolders] = useState<readonly string[]>(START_FOLDERS);
  const [error, setError] = useState<string>();
  const [round, setRound] = useState(0);

  const handleCreate = (name: string) => {
    if (folders.some((folder) => folder.toLowerCase() === name.toLowerCase())) {
      setError(`A folder named ${name} already exists.`);
      return;
    }
    setFolders([...folders, name]);
    setError(undefined);
    setRound(round + 1);
  };

  return (
    <Card className="inline-create-story__folders">
      <Text className="story-label">Folders</Text>
      {folders.map((folder) => (
        <Box key={folder} className="inline-create-story__folder">
          <Icon name="folder" size={14} />
          <Text>{folder}</Text>
        </Box>
      ))}
      <InlineCreateForm
        key={round}
        compact
        label="New folder name"
        placeholder="New folder"
        submitLabel="Create folder"
        error={error}
        onCreate={handleCreate}
      />
    </Card>
  );
};

export { FolderListDemo };
