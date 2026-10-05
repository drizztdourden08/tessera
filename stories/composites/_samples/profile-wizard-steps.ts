/* @layer stories @kind data */
import type { WizardProblem, WizardReviewSection, WizardStepDef } from '../../../src/composites';
import { EXISTING_NAMES, LANGUAGES, MODE_LABEL, MSU_PACKS, PRESETS } from './profile-wizard-data';
import type { Choice, ProfileDraft } from './profile-wizard-data';
import { changedIn, changedNames, changedTotal, RANDOMIZER_TABS } from './randomizer-options';

const randomizer = (draft: ProfileDraft): boolean => draft.mode !== 'standard';

const nameProblem = (name: string): WizardProblem | null => {
  if (name.trim() === '') return 'Give the profile a name to continue.';
  return EXISTING_NAMES.includes(name.trim()) ? { message: 'A profile with this name already exists.', inField: true } : null;
};

const seedProblem = (draft: ProfileDraft): string | null => {
  if (draft.seed.trim() === '') return 'The randomizer needs a seed. Type one, or keep the one thrown for you.';
  if (draft.mode === 'online' && (draft.server.trim() === '' || draft.slot.trim() === '')) return 'Enter the server URL and your slot name to continue.';
  return null;
};

const labelOf = (choices: readonly Choice[], value: string): string => choices.find((c) => c.value === value)?.label ?? value;

const seedLine = (draft: ProfileDraft): string => (draft.mode === 'online' ? `${draft.slot || 'No slot'} on ${draft.server || 'no server'}` : draft.seed);

type SeedExtra = WizardStepDef<ProfileDraft>['extra'];

const profileSteps = (seedExtra: SeedExtra): readonly WizardStepDef<ProfileDraft>[] => [
  { id: 'basics', label: 'Basics', description: 'Name the profile and pick the ROM it plays.', validate: (d) => nameProblem(d.name), summary: (d) => d.name.trim() },
  {
    id: 'mode',
    label: 'Mode',
    description: 'How this profile plays. It is locked once the profile is created.',
    validate: (d) => (d.mode === '' ? 'Pick a mode to continue.' : null),
    summary: (d) => MODE_LABEL[d.mode],
  },
  {
    id: 'seed',
    label: 'Seed and connection',
    description: 'The seed decides where every item lands. Locked once the profile is created.',
    when: randomizer,
    validate: seedProblem,
    summary: seedLine,
    extra: seedExtra,
  },
  {
    id: 'options',
    label: 'Randomizer options',
    description: 'The settings, by subject. A number on a tab counts the rows inside it that are not on their default.',
    when: randomizer,
    summary: (d) => `${changedTotal(d.options)} changed`,
    subSteps: (d) => RANDOMIZER_TABS.map((tab) => ({ id: tab.id, label: tab.label, count: changedIn(tab, d.options) })),
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'You can change these later from the profile.',
    summary: (d) => `${labelOf(PRESETS, d.preset)}, ${labelOf(LANGUAGES, d.language)}`,
  },
  {
    id: 'review',
    label: 'Review',
    description: 'Check everything, then create the profile.',
    busyHint: (d) => (d.mode === 'standard' ? 'Creating profile...' : 'Generating seed...'),
    buttons: { next: { label: 'Create profile', icon: 'plus' } },
  },
];

const optionRows = (draft: ProfileDraft) => {
  const names = changedNames(draft.options);
  return names.length === 0
    ? [{ label: 'Changed', value: 'None, every tab is on its defaults' }]
    : names.map((name) => ({ label: name.split(': ')[0] ?? name, value: name.split(': ')[1] ?? '' }));
};

const seedRows = (draft: ProfileDraft) => [
  { label: 'Seed', value: draft.seed },
  ...(draft.mode === 'online' ? [{ label: 'Server URL', value: draft.server }, { label: 'Slot name', value: draft.slot }] : []),
];

const profileReview = (draft: ProfileDraft): readonly WizardReviewSection[] => [
  { stepId: 'basics', title: 'Basics', rows: [{ label: 'Profile name', value: draft.name }, { label: 'ROM', value: draft.rom }] },
  { stepId: 'mode', title: 'Mode', rows: [{ label: 'Mode', value: MODE_LABEL[draft.mode] }] },
  ...(randomizer(draft) ? [
    { stepId: 'seed', title: 'Seed and connection', rows: seedRows(draft) },
    { stepId: 'options', title: 'Randomizer options', rows: optionRows(draft) },
  ] : []),
  {
    stepId: 'settings',
    title: 'Settings',
    rows: [
      { label: 'Preset', value: labelOf(PRESETS, draft.preset) },
      { label: 'Language', value: labelOf(LANGUAGES, draft.language) },
      { label: 'MSU pack', value: labelOf(MSU_PACKS, draft.msu) },
    ],
  },
];

export { profileReview, profileSteps };
