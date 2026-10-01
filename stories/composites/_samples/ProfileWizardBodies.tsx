/* @layer stories @kind story */
import { WizardReview } from '../../../src/composites';
import type { WizardApi } from '../../../src/composites';
import { Box, Callout, Field, Icon, P, Pressable, Select, Strong, TextInput } from '../../../src/primitives';
import { EXISTING_NAMES, GAMES, LANGUAGES, MODES, MSU_PACKS, PRESETS } from './profile-wizard-data';
import type { ProfileDraft } from './profile-wizard-data';
import { profileReview } from './profile-wizard-steps';

type BodyProps = { wizard: WizardApi<ProfileDraft> };

const BasicsBody = ({ wizard }: BodyProps) => {
  const { name, rom } = wizard.values;
  const taken = EXISTING_NAMES.includes(name.trim()) ? 'A profile with this name already exists.' : undefined;
  return (
    <>
      <Field label="Profile name" hint="Shown in the profile list and the window title." error={taken} required>
        <TextInput value={name} placeholder="Speedrun seed" invalid={taken !== undefined} onChange={(e) => wizard.setValue('name', e.target.value)} />
      </Field>
      <Field label="Game" hint="Two ROMs are ready. Import another from the profiles screen.">
        <Select options={GAMES} value={rom} onChange={(value) => wizard.setValue('rom', value)} />
      </Field>
    </>
  );
};

const ModeBody = ({ wizard }: BodyProps) => (
  <Box role="radiogroup" aria-label="Mode" className="profile-wizard-story__modes">
    {MODES.map((mode) => (
      <Pressable
        key={mode.value}
        role="radio"
        aria-checked={wizard.values.mode === mode.value}
        className="profile-wizard-story__mode"
        onClick={() => wizard.setValue('mode', mode.value)}
      >
        <Icon name={mode.icon} className="profile-wizard-story__mode-icon" />
        <Strong>{mode.label}</Strong>
        <P tone="dim">{mode.description}</P>
      </Pressable>
    ))}
  </Box>
);

const SettingsBody = ({ wizard }: BodyProps) => (
  <>
    <Field label="Preset" hint="Which widgets open and where they sit.">
      <Select options={PRESETS} value={wizard.values.preset} onChange={(value) => wizard.setValue('preset', value)} />
    </Field>
    <Field label="Language" hint="For the game text, where the ROM allows it.">
      <Select options={LANGUAGES} value={wizard.values.language} onChange={(value) => wizard.setValue('language', value)} />
    </Field>
    <Field label="MSU pack" hint="Replaces the music with a recorded soundtrack.">
      <Select options={MSU_PACKS} value={wizard.values.msu} onChange={(value) => wizard.setValue('msu', value)} />
    </Field>
  </>
);

const ReviewBody = ({ wizard }: BodyProps) => (
  <>
    <WizardReview sections={profileReview(wizard.values)} onEdit={wizard.goTo} disabled={wizard.busy} />
    <Callout tone="info" variant="footnote">Creating the profile generates the seed and patches a copy of your ROM. It takes a few seconds.</Callout>
  </>
);

export { BasicsBody, ModeBody, ReviewBody, SettingsBody };
export type { BodyProps };
