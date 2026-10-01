/* @layer stories @kind data */
import type { WizardProblem, WizardReviewSection, WizardStepDef, WizardStepInfo } from '../../../src/composites';
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

const PROFILE_STEPS: readonly WizardStepDef<ProfileDraft>[] = [
  { id: 'basics', label: 'Basics', description: 'Name the profile and pick the ROM it plays.', validate: (d) => nameProblem(d.name) },
  { id: 'mode', label: 'Mode', description: 'How this profile plays. It is locked once the profile is created.', validate: (d) => (d.mode === '' ? 'Pick a mode to continue.' : null) },
  { id: 'seed', label: 'Seed and connection', description: 'The seed decides where every item lands. Locked once the profile is created.', when: randomizer, validate: seedProblem },
  {
    id: 'options',
    label: 'Randomizer options',
    description: 'The settings, by subject. A number on a tab counts the rows inside it that are not on their default.',
    when: randomizer,
  },
  { id: 'settings', label: 'Settings', description: 'You can change these later from the profile.' },
  { id: 'review', label: 'Review', description: 'Check everything, then create the profile.' },
];

const labelOf = (choices: readonly Choice[], value: string): string => choices.find((c) => c.value === value)?.label ?? value;

const seedLine = (draft: ProfileDraft): string => (draft.mode === 'online' ? `${draft.slot || 'No slot'} on ${draft.server || 'no server'}` : draft.seed);

const profileStepInfo = (draft: ProfileDraft, visited: readonly string[], current: string): Readonly<Record<string, WizardStepInfo>> => {
  const seen = (id: string, summary: string) => (visited.includes(id) && id !== current ? summary : undefined);
  return {
    basics: { summary: seen('basics', draft.name.trim()) },
    mode: { summary: seen('mode', MODE_LABEL[draft.mode]) },
    seed: { summary: seen('seed', seedLine(draft)) },
    options: {
      summary: seen('options', `${changedTotal(draft.options)} changed`),
      subSteps: RANDOMIZER_TABS.map((tab) => ({ id: tab.id, label: tab.label, count: changedIn(tab, draft.options) })),
    },
    settings: { summary: seen('settings', `${labelOf(PRESETS, draft.preset)}, ${labelOf(LANGUAGES, draft.language)}`) },
  };
};

const optionRows = (draft: ProfileDraft) => {
  const names = changedNames(draft.options);
  return names.length === 0
    ? [{ term: 'Changed', detail: 'None, every tab is on its defaults' }]
    : names.map((name) => ({ term: name.split(': ')[0] ?? name, detail: name.split(': ')[1] ?? '' }));
};

const seedRows = (draft: ProfileDraft) => [
  { term: 'Seed', detail: draft.seed },
  ...(draft.mode === 'online' ? [{ term: 'Server URL', detail: draft.server }, { term: 'Slot name', detail: draft.slot }] : []),
];

const profileReview = (draft: ProfileDraft): readonly WizardReviewSection[] => [
  { stepId: 'basics', title: 'Basics', rows: [{ term: 'Profile name', detail: draft.name }, { term: 'ROM', detail: draft.rom }] },
  { stepId: 'mode', title: 'Mode', rows: [{ term: 'Mode', detail: MODE_LABEL[draft.mode] }] },
  ...(randomizer(draft) ? [
    { stepId: 'seed', title: 'Seed and connection', rows: seedRows(draft) },
    { stepId: 'options', title: 'Randomizer options', rows: optionRows(draft) },
  ] : []),
  {
    stepId: 'settings',
    title: 'Settings',
    rows: [
      { term: 'Preset', detail: labelOf(PRESETS, draft.preset) },
      { term: 'Language', detail: labelOf(LANGUAGES, draft.language) },
      { term: 'MSU pack', detail: labelOf(MSU_PACKS, draft.msu) },
    ],
  },
];

export { PROFILE_STEPS, profileReview, profileStepInfo };
