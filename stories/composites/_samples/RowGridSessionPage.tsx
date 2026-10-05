/* @layer stories @kind component */
import { useState } from 'react';
import { ContentHeader, SaveBar } from '../../../src/composites';
import { Box, Icon, SectionHeader } from '../../../src/primitives';
import { PlayersGrid } from './PlayersGrid';
import { useSaveDemo } from './useSaveDemo';

const BACK = { label: 'Sessions', onSelect: () => undefined };

const RowGridSessionPage = () => {
  const [dirty, setDirty] = useState(false);
  const [round, setRound] = useState(0);
  const saving = useSaveDemo(dirty);
  const edit = () => {
    saving.reset();
    setDirty(true);
  };
  const save = () => void saving.run(() => {
    setDirty(false);
    return undefined;
  });
  const discard = () => {
    saving.reset();
    setDirty(false);
    setRound(round + 1);
  };
  return (
    <Box className="row-grid-story__page">
      <ContentHeader back={BACK} icon={<Icon name="layers" />} title="Friday run" />
      <Box className="row-grid-story__body">
        <SectionHeader title="Players" />
        <PlayersGrid key={round} onEdit={edit} />
      </Box>
      <SaveBar state={saving.state} onSave={save} onDiscard={discard} />
    </Box>
  );
};

export { RowGridSessionPage };
