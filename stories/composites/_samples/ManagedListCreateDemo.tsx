/* @layer stories @kind component */
import { useState } from 'react';
import { InlineCreateForm, ManagedList } from '../../../src/composites';
import { Box, Field, Select } from '../../../src/primitives';
import { profileRow } from './profile-row';
import { PROFILE_GAMES, PROFILE_TEMPLATES, PROFILES } from './profile-samples.constants';
import type { SampleProfile } from './profile-samples.type';

const idOf = (profile: SampleProfile) => profile.id;
const nameOf = (profile: SampleProfile) => profile.name;

const ManagedListCreateDemo = () => {
  const [profiles, setProfiles] = useState<readonly SampleProfile[]>(PROFILES);
  const [selectedId, setSelectedId] = useState<string | null>('pr1');
  const [game, setGame] = useState('');
  const [template, setTemplate] = useState('blank');
  const reset = (close: () => void) => {
    setGame('');
    setTemplate('blank');
    close();
  };
  const add = (name: string, close: () => void) => {
    const id = `profile-${Date.now()}`;
    setProfiles((list) => [{ id, name, game, template }, ...list]);
    setSelectedId(id);
    reset(close);
  };
  return (
    <Box className="managed-list-story">
      <ManagedList
        title="Profiles"
        items={profiles}
        getId={idOf}
        getName={nameOf}
        render={profileRow}
        selectedId={selectedId}
        onSelect={setSelectedId}
        createLabel="New profile"
        create={(close) => (
          <InlineCreateForm
            placeholder="Profile name"
            canSubmit={game !== ''}
            onCreate={(name) => add(name, close)}
            onCancel={() => reset(close)}
            extraFields={(
              <>
                <Field label="Game"><Select value={game} onChange={setGame} options={PROFILE_GAMES} placeholder="Pick a game" /></Field>
                <Field label="Template"><Select value={template} onChange={setTemplate} options={PROFILE_TEMPLATES} /></Field>
              </>
            )}
          />
        )}
      />
    </Box>
  );
};

export { ManagedListCreateDemo };
