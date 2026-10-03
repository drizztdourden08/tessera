/* @layer stories @kind story */
import { useState } from 'react';
import { ListItemRow, SettingsPage } from '../../../src/composites';
import { Box, Button, Callout, Icon } from '../../../src/primitives';
import { ProfileWizard } from './ProfileWizard';
import { PROFILE_ROWS, ROM_NAME } from './rotp-profiles';
import type { ProfileRow } from './rotp-profiles';

type Outcome = { kind: 'created'; name: string } | { kind: 'left' } | null;

type ProfilesScreenProps = { failNext: boolean; onFailUsed: () => void };

const ProfileList = ({ rows, outcome }: { rows: readonly ProfileRow[]; outcome: Outcome }) => (
  <>
    {outcome?.kind === 'created' && <Callout tone="success" icon={<Icon name="circle-check" />}>{`${outcome.name} is ready. Double-click it to play.`}</Callout>}
    {outcome?.kind === 'left' && <Callout tone="info" icon={<Icon name="info" />}>You left the wizard. Nothing was saved.</Callout>}
    <Box className="rotp-window__list" role="list">
      {rows.map((row, index) => (
        <ListItemRow
          key={row.name}
          icon={<Icon name={row.icon} />}
          name={row.name}
          meta={row.meta}
          columns={[{ primary: row.aside, align: 'end' }]}
          selected={index === 0 && outcome?.kind === 'created'}
        />
      ))}
    </Box>
  </>
);

const RotpProfilesScreen = ({ failNext, onFailUsed }: ProfilesScreenProps) => {
  const [run, setRun] = useState(0);
  const [creating, setCreating] = useState(true);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [rows, setRows] = useState<readonly ProfileRow[]>(PROFILE_ROWS);
  const finish = (next: Outcome) => {
    setOutcome(next);
    setCreating(false);
    setRun(run + 1);
  };
  const created = (name: string) => {
    setRows([{ name, icon: 'user', meta: ROM_NAME, aside: 'Never played' }, ...rows]);
    finish({ kind: 'created', name });
  };
  const newProfile = <Button variant="primary" icon={<Icon name="plus" />} onClick={() => setCreating(true)}>New Profile</Button>;
  return (
    <SettingsPage icon={<Icon name="users" />} title="Profiles" scroll={false} actions={creating ? undefined : newProfile}>
      <Box className="rotp-window__fill">
        {creating
          ? <ProfileWizard key={run} failNext={failNext} onFailUsed={onFailUsed} onCreated={created} onLeft={() => finish({ kind: 'left' })} />
          : <ProfileList rows={rows} outcome={outcome} />}
      </Box>
    </SettingsPage>
  );
};

export { RotpProfilesScreen };
