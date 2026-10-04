/* @layer stories @kind hook */
import { useState } from 'react';
import { InlineCreateForm } from '../../../src/composites';
import { Field, Select } from '../../../src/primitives';
import { profileRow } from './profile-row';
import { PROFILE_GAMES, PROFILE_TEMPLATES, PROFILES } from './profile-samples.constants';
import type { SampleProfile, SampleProfiles } from './profile-samples.type';

const idOf = (profile: SampleProfile) => profile.id;
const nameOf = (profile: SampleProfile) => profile.name;

const useSampleProfiles = (firstRun: boolean): SampleProfiles => {
  const [profiles, setProfiles] = useState<readonly SampleProfile[]>(firstRun ? [] : PROFILES);
  const [selectedId, setSelectedId] = useState<string | null>(firstRun ? null : 'pr1');
  const [creating, setCreating] = useState(false);
  const none = profiles.length === 0;
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
  const list = {
    title: 'Profiles',
    items: profiles,
    getId: idOf,
    getName: nameOf,
    render: profileRow,
    selectedId,
    createLabel: 'New profile',
    createOpen: creating || none,
    onCreateOpenChange: setCreating,
    empty: 'Create a profile to get started.',
    create: (close: () => void) => (
      <InlineCreateForm
        placeholder="Profile name"
        canSubmit={game !== ''}
        onCreate={(name) => add(name, close)}
        onCancel={none ? undefined : () => reset(close)}
        extraFields={(
          <>
            <Field label="Game"><Select value={game} onChange={setGame} options={PROFILE_GAMES} placeholder="Pick a game" /></Field>
            <Field label="Template"><Select value={template} onChange={setTemplate} options={PROFILE_TEMPLATES} /></Field>
          </>
        )}
      />
    ),
  };
  const rename = (id: string, name: string) => setProfiles((all) => all.map((profile) => (profile.id === id ? { ...profile, name } : profile)));
  const remove = (id: string) => setProfiles((all) => all.filter((profile) => profile.id !== id));
  return { list, pick: setSelectedId, rename, remove };
};

export { useSampleProfiles };
