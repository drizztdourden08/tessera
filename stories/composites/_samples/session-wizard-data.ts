/* @layer stories @kind data */
import type { WizardReviewSection, WizardStepDef } from '../../../src/composites';

type SessionDraft = { name: string; preset: string; slots: number; server: string; release: string };

const SESSION_PRESETS = [
  { value: 'casual', label: 'Casual', description: 'Hints on, short goal' },
  { value: 'short', label: 'Short', description: 'About an hour per game' },
  { value: 'tournament', label: 'Tournament', description: 'No hints, spoiler log sealed' },
];

const SESSION_SERVERS = [
  { value: 'eu-west-2', label: 'eu-west-2' },
  { value: 'us-east-1', label: 'us-east-1' },
  { value: 'local', label: 'This computer' },
];

const RELEASE_MODES = [
  { value: 'auto', label: 'Auto', description: 'Items go out when a player finishes' },
  { value: 'manual', label: 'Manual', description: 'A finished player sends them with a command' },
  { value: 'disabled', label: 'Disabled', description: 'Items stay put' },
];

const INITIAL_SESSION_DRAFT: SessionDraft = { name: '', preset: 'casual', slots: 8, server: 'eu-west-2', release: 'auto' };

const SESSION_STEPS: readonly WizardStepDef<SessionDraft>[] = [
  { id: 'preset', label: 'Game preset', description: 'The rules every game in the session follows.' },
  {
    id: 'players',
    label: 'Players',
    description: 'How many worlds the room holds and what happens to a finished world.',
    validate: (draft) => (draft.slots >= 2 && draft.slots <= 32 ? null : 'A session holds 2 to 32 players.'),
  },
  {
    id: 'server',
    label: 'Server',
    description: 'Where the room runs and what players see in their list.',
    validate: (draft) => (draft.name.trim() === '' ? 'Name the room to continue.' : null),
  },
  { id: 'review', label: 'Review', description: 'Check the details, then open the room.' },
];

const labelIn = (list: readonly { value: string; label: string }[], value: string) => list.find((item) => item.value === value)?.label ?? value;

const sessionReview = (draft: SessionDraft): readonly WizardReviewSection[] => [
  { stepId: 'preset', title: 'Game preset', rows: [{ term: 'Preset', detail: labelIn(SESSION_PRESETS, draft.preset) }] },
  {
    stepId: 'players',
    title: 'Players',
    rows: [{ term: 'Slots', detail: `${draft.slots} players` }, { term: 'Release', detail: labelIn(RELEASE_MODES, draft.release) }],
  },
  { stepId: 'server', title: 'Server', rows: [{ term: 'Room', detail: draft.name }, { term: 'Server', detail: labelIn(SESSION_SERVERS, draft.server) }] },
];

export type { SessionDraft };
export { INITIAL_SESSION_DRAFT, RELEASE_MODES, SESSION_PRESETS, SESSION_SERVERS, SESSION_STEPS, sessionReview };
