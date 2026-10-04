/* @layer stories @kind data */
import type { PreviewUsage } from '../_shared/preview-usage.type';

const EDITOR_BAR_USAGE = {
  job: 'The top strip of an editor: the name of the thing edited, what it belongs to, whether it is saved, and its buttons.',
  useWhen: [
    'A screen edits one named thing, such as a preset or a session, and saves it with a button.',
    'The user needs to see at a glance whether the changes are saved.',
  ],
  avoidWhen: [
    { case: 'The page has a title and no name to edit.', use: 'ContentHeader' },
    { case: 'Each setting saves the moment it changes.', use: 'SettingsRow' },
    { case: 'A new thing is named before it exists.', use: 'InlineCreateForm' },
  ],
  rules: [
    'Put the bar right under the page header, or at the top of a pane that has no header; pass back only when no header above offers it.',
    'Keep the page header for the page; the bar holds the name, so the name shows once.',
    'Move state through clean, dirty, saving, then saved or error; pass error as a sentence that says what to do.',
    'Put at most two buttons in actions, the main one last; more go in a menu.',
  ],
  a11y: [
    'The name is a text box named Name, or nameLabel; Escape puts back the name it had on focus, Enter leaves it.',
    'The save state is a status region, so a screen reader hears Saving, Saved and Not saved with the reason.',
    'The back button is named by its label and shows it as a tooltip.',
  ],
  example: `import { EditorBar } from '@drizztdourden08/tessera';

<ContentHeader back={{ label: 'Back to Presets', onSelect: openPresets }} icon={<Icon name="sliders-horizontal" />} title="Edit preset" />
<EditorBar
  name={preset.name}
  onNameChange={rename}
  context={[preset.game, 'Preset']}
  state={saveState}
  error={saveError}
  actions={<><Button variant="ghost" onClick={reset}>Reset all</Button><Button variant="primary" onClick={save}>Save</Button></>}
/>`,
} satisfies PreviewUsage;

export { EDITOR_BAR_USAGE };
