/* @layer stories @kind data */
import type { PlaygroundArgTypes } from '../../../_template/controls/playground.type';
import type { PreviewChoice } from '../../_shared/preview-shared.type';
import type { SaveStateKind } from '../EditorBar.type';
import type { EditorOption } from './EditorOption.type';
import type { EditorArgs } from './editor-story.type';

const SAVE_STATES: readonly SaveStateKind[] = ['clean', 'dirty', 'saving', 'saved', 'error'];

const EDITOR_ARGS: EditorArgs = { name: 'Keysanity', state: 'dirty', context: true, back: false, edge: 'top' };

const EDITOR_ARG_TYPES: PlaygroundArgTypes<EditorArgs> = {
  name: { group: 'Content', control: 'text' },
  state: { group: 'State', control: 'select', options: [...SAVE_STATES] },
  context: { group: 'Content', control: 'boolean', description: 'What the edited thing belongs to, after the name.' },
  back: { group: 'Content', control: 'boolean', description: 'A back arrow, for a pane with no page header above.' },
  edge: { group: 'Appearance', control: 'select', options: ['top', 'foot'], description: 'Top of the editor, or a save bar at its foot with no name.' },
};

const OPTION_ROWS: readonly { key: EditorOption; label: string }[] = [
  { key: 'bar', label: 'A: a bar under the header (recommended)' },
  { key: 'header', label: 'B: the name in the header' },
  { key: 'foot', label: 'C: a save bar at the foot' },
];

const EDITOR_CHOICES: readonly PreviewChoice[] = [
  {
    name: 'A: a bar under the page header',
    chosen: true,
    why: 'The page header stays the one special piece and keeps its job. The bar reads as part of the editor, shows the name once, and puts the save state beside the Save button it answers to. It works the same in a pane, where it takes the back arrow.',
  },
  {
    name: 'B: the name in the page header',
    why: 'No extra row, but the header turns into a form: a text box inside the heading, the save state in the strip and the buttons in its actions. Each editor would bend the header its own way, the overuse the owner warned against. The context has no room left, and a narrow column squeezes the name out.',
  },
  {
    name: 'C: a save bar at the foot',
    why: 'A known pattern for long forms, but it splits the editor in two: the name in the body, the state at the bottom, far from the title. It suits a long settings form better than a named editor.',
  },
  {
    name: 'The first proposal: a big header band',
    why: 'Turned down by the owner. A second header with its own backdrop competes with the page header and looks heavy stacked under it.',
  },
];

const EDITOR_CODE = `import { EditorBar } from '@drizztdourden08/tessera';

<ContentHeader back={{ label: 'Back to Presets', onSelect: openPresets }} icon={<Icon name="sliders-horizontal" />} title="Edit preset" />
<EditorBar
  name={preset.name}
  onNameChange={rename}
  context={[preset.game, 'Preset']}
  state={saveState}
  error={saveError}
  actions={<><Button variant="ghost" onClick={reset}>Reset all</Button><Button variant="primary" onClick={save}>Save</Button></>}
/>`;

export { EDITOR_ARG_TYPES, EDITOR_ARGS, EDITOR_CHOICES, EDITOR_CODE, OPTION_ROWS, SAVE_STATES };
