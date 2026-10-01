/* @layer stories @kind story */
import { WizardReview } from '../../../src/composites';
import type { WizardApi } from '../../../src/composites';
import { Box, Callout, Field, Icon, P, Pressable, SegmentedControl, Select, Strong, TextInput } from '../../../src/primitives';
import { EXISTING_NAMES, LANGUAGES, MODES, MSU_PACKS, PRESET_HINT, PRESETS, ROMS } from './profile-wizard-data';
import type { ProfileDraft } from './profile-wizard-data';
import { profileReview } from './profile-wizard-steps';

type BodyProps = { wizard: WizardApi<ProfileDraft> };

const BasicsBody = ({ wizard }: BodyProps) => {
  const { name, rom } = wizard.values;
  const taken = EXISTING_NAMES.includes(name.trim()) ? 'A profile with this name already exists.' : undefined;
  return (
    <>
      <Field label="Profile name" hint="Shown in the profile list and the window title." error={taken} required>
        <TextInput value={name} placeholder="My Profile" invalid={taken !== undefined} onChange={(e) => wizard.setValue('name', e.target.value)} />
      </Field>
      <Field label="ROM" hint="Only ROMs with their assets extracted are listed. Import another from ROMs." required>
        <Select options={ROMS} value={rom} placeholder="Select ROM..." onChange={(value) => wizard.setValue('rom', value)} />
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
    <SegmentedControl
      label="Preset"
      description={PRESET_HINT[wizard.values.preset]}
      options={PRESETS}
      value={wizard.values.preset}
      onChange={(value) => wizard.setValue('preset', value)}
    />
    <Field label="Language" hint="Language packs come from the ROMs you imported.">
      <Select options={LANGUAGES} value={wizard.values.language} onChange={(value) => wizard.setValue('language', value)} />
    </Field>
    <Field label="MSU pack" hint="Replaces the music with a recorded soundtrack. Packs live in the MSU folder.">
      <Select options={MSU_PACKS} value={wizard.values.msu} onChange={(value) => wizard.setValue('msu', value)} />
    </Field>
  </>
);

const ReviewBody = ({ wizard }: BodyProps) => (
  <>
    <WizardReview sections={profileReview(wizard.values)} onEdit={wizard.goTo} disabled={wizard.busy} />
    <Callout tone="info" variant="footnote">Creating a randomizer profile throws the seed and places every item. It takes a few seconds.</Callout>
  </>
);

export { BasicsBody, ModeBody, ReviewBody, SettingsBody };
export type { BodyProps };
