/* @layer stories @kind story */
import { Box, Button, Callout, Field, Icon, Select, TextInput } from '../../../src/primitives';
import { SEEDS, SERVERS } from './profile-wizard-data';
import type { BodyProps } from './ProfileWizardBodies';

const nextSeed = (seed: string): string => SEEDS[(SEEDS.indexOf(seed) + 1) % SEEDS.length] ?? seed;

const ProfileSeedBody = ({ wizard }: BodyProps) => {
  const { seed, server, slot, mode } = wizard.values;
  return (
    <>
      <Field label="Seed" hint="Share it and others play the same world.">
        <Box className="profile-wizard-story__seed">
          <TextInput className="profile-wizard-story__seed-input" value={seed} spellCheck={false} onChange={(e) => wizard.setValue('seed', e.target.value)} />
          <Button variant="secondary" icon={<Icon name="refresh-cw" />} onClick={() => wizard.setValue('seed', nextSeed(seed))}>Reroll</Button>
        </Box>
      </Field>
      {mode === 'online' && (
        <>
          <Field label="Room" hint="The multiworld server and port from your host.">
            <Select options={SERVERS} value={server} onChange={(value) => wizard.setValue('server', value)} />
          </Field>
          <Field label="Slot name" hint="The name you registered in that room.">
            <TextInput value={slot} placeholder="Mira_ALttP" onChange={(e) => wizard.setValue('slot', e.target.value)} />
          </Field>
        </>
      )}
      <Callout tone="warning" variant="footnote">The mode and seed lock once the profile exists. Duplicate the profile to change them.</Callout>
    </>
  );
};

export { ProfileSeedBody };
