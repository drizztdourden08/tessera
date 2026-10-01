/* @layer stories @kind story */
import { Box, Button, Callout, Field, Icon, TextInput } from '../../../src/primitives';
import type { ConnectionState } from './connection-test';
import { SEEDS } from './profile-wizard-data';
import type { BodyProps } from './ProfileWizardBodies';

const nextSeed = (seed: string): string => SEEDS[(SEEDS.indexOf(seed) + 1) % SEEDS.length] ?? seed;

const ConnectionNote = ({ connection }: { connection: ConnectionState }) => {
  if (connection.status === 'ok') return <Callout tone="success" icon={<Icon name="plug-zap" />}>{connection.message}</Callout>;
  if (connection.status === 'failed') return <Callout tone="danger" icon={<Icon name="circle-alert" />}>{connection.message}</Callout>;
  return null;
};

const ProfileSeedBody = ({ wizard, connection }: BodyProps & { connection: ConnectionState }) => {
  const { seed, server, slot, mode } = wizard.values;
  return (
    <>
      <Field label="Seed" hint="Thrown for you. Share it and others play the same world.">
        <Box className="profile-wizard-story__seed">
          <TextInput className="profile-wizard-story__seed-input" value={seed} placeholder="a seed is required" spellCheck={false} onChange={(e) => wizard.setValue('seed', e.target.value)} />
          <Button variant="secondary" icon={<Icon name="refresh-cw" />} onClick={() => wizard.setValue('seed', nextSeed(seed))}>New seed</Button>
        </Box>
      </Field>
      {mode === 'online' && (
        <>
          <Field label="Server URL" hint="The Archipelago room your host shared, with its port." required>
            <TextInput value={server} placeholder="archipelago.gg:38281" spellCheck={false} onChange={(e) => wizard.setValue('server', e.target.value)} />
          </Field>
          <Field label="Slot name" hint="The name you registered in that room." required>
            <TextInput value={slot} placeholder="Player" onChange={(e) => wizard.setValue('slot', e.target.value)} />
          </Field>
          <ConnectionNote connection={connection} />
        </>
      )}
      <Callout tone="warning" variant="footnote">Locked once the profile is created. Duplicate the profile to change the seed or the room.</Callout>
    </>
  );
};

export { ProfileSeedBody };
