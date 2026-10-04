/* @layer stories @kind story */
import { useState } from 'react';
import { SettingsSection } from '../../../src/composites';
import type { SettingsItem } from '../../../src/composites';
import { Box, Icon, Tag } from '../../../src/primitives';

const DEFAULTS = { hints: 'all', deathLink: false, name: 'mira', release: 'auto', cache: '512', owner: 'steam:7656119' };

const LONG = 'Hints point at the item a player needs next. A player pays hint points for each one, earned by checking locations, '
  + 'and the cost grows with every hint in the session. Pick who may ask for hints and how often the server answers. '
  + 'Own world limits a player to hints for their own items, so nobody spends points on what another player needs, '
  + 'and Off turns hints off for the whole session, also for players who join later.';

const useMarks = () => {
  const [s, setS] = useState({ ...DEFAULTS, hints: 'own', deathLink: true, name: '' });
  const mark = (key: keyof typeof DEFAULTS) => ({ changed: s[key] !== DEFAULTS[key], onReset: () => setS({ ...s, [key]: DEFAULTS[key] }) });
  return { s, set: (patch: Partial<typeof s>) => setS({ ...s, ...patch }), mark, resetAll: () => setS(DEFAULTS) };
};

const RowMarksDemo = (props: { compact?: boolean }) => {
  const { s, set, mark, resetAll } = useMarks();
  const rows: SettingsItem[] = [
    {
      id: 'hints', title: 'Hint policy', description: LONG, descriptionLines: 2, hint: 'Applies from the next hint.', ...mark('hints'),
      input: { kind: 'segmented', value: s.hints, onChange: (v) => set({ hints: v }), options: [{ value: 'all', label: 'Everyone' }, { value: 'own', label: 'Own world' }, { value: 'off', label: 'Off' }] },
    },
    {
      id: 'death-link', title: 'Death link', description: 'When one player falls, every player falls.', hint: 'Off by default in races.', ...mark('deathLink'),
      badge: <Tag color="secondary">Advanced</Tag>,
      input: { kind: 'toggle', value: s.deathLink, onChange: (v) => set({ deathLink: v }) },
    },
    {
      id: 'name', title: 'Display name', description: 'What other players see in a session.', hint: 'Up to 32 characters.', ...mark('name'),
      problem: s.name.trim() === '' ? 'Type a name: players cannot join a player with no name.' : undefined,
      input: { kind: 'text', value: s.name, onChange: (v) => set({ name: v }), placeholder: 'Your name' },
    },
    {
      id: 'release', title: 'Release mode', description: 'When the items of a finished player go out.', hint: 'Players can change it in a running session.', ...mark('release'),
      input: { kind: 'select', value: s.release, onChange: (v) => set({ release: v }), options: [{ value: 'auto', label: 'Auto' }, { value: 'goal', label: 'After goal' }] },
    },
    {
      id: 'cache', title: 'World cache', description: 'Generated worlds kept on disk.', hint: 'Rebuild after a game update.', ...mark('cache'),
      input: { kind: 'select', value: s.cache, onChange: (v) => set({ cache: v }), options: [{ value: '256', label: '256 MB' }, { value: '512', label: '512 MB' }] },
      actions: [{ id: 'rebuild', label: 'Rebuild', icon: <Icon name="rotate-ccw" />, onClick: () => set({ cache: DEFAULTS.cache }) }],
    },
    {
      id: 'owner', title: 'Owner id', description: s.owner === '' ? 'No owner: the next player to join claims the server.' : `Held by ${s.owner}.`, hint: 'The owner may change server options.',
      actions: [{ id: 'forget', label: 'Forget the owner id', tone: 'danger', confirm: 'Forget it?', disabled: s.owner === '', onClick: () => set({ owner: '' }) }],
    },
  ];
  return (
    <Box className="story-column">
      <SettingsSection id="row-marks" title="Session" rows={rows} compact={props.compact} onReset={resetAll} />
    </Box>
  );
};

export { RowMarksDemo };
