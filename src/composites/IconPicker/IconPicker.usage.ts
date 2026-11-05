/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'An icon button that opens a popover to pick one icon from a searchable grid, or to upload an SVG or PNG, and hands back one value.',
  useWhen: [
    'The user gives something an icon, such as a project, a folder or a shortcut.',
    'The user may bring their own image: leave allowUpload on, so an SVG or PNG can be uploaded.',
  ],
  avoidWhen: [
    { case: 'The user picks one cell from a strip or grid you draw yourself.', use: 'ChoiceGrid' },
    { case: 'The icon is shown, not edited.', use: 'Icon' },
  ],
  rules: [
    'The app owns the value: pass value and onChange. The value is an icon name, an SVG text or a PNG data URL, told apart by kind.',
    'Pass label to name the button for assistive tools, such as Project icon.',
    'Pass icons to limit the grid to a short list of names; without it the grid holds every icon of the family.',
    'An uploaded SVG must be 64 KB or less and start with an svg element; a PNG must be 256 KB or less. A rejected file shows the reason under the button and leaves the value alone.',
    'An SVG is drawn as an image, never as markup, so its scripts never run. Store the SVG text as given.',
    'Pass allowUpload false to hide the upload button.',
  ],
  a11y: [
    'The button reads its label, says it opens a dialog and reports whether it is open.',
    'The search field has focus on open; Down moves into the grid. The grid is one Tab stop, arrows move, Home and End jump, Enter or Space picks, and Escape closes and returns focus to the button.',
    'Each icon is an option named after the icon. A rejected file is read as an error under the upload button.',
  ],
  tree: {
    path: ['a value the user sets', 'an icon'],
    rule: 'IconPicker is the button that picks an icon from a grid or uploads an SVG or PNG.',
  },
  example: `import { useState } from 'react';
import { IconPicker } from '@drizztdourden08/tessera';
import type { IconPickerValue } from '@drizztdourden08/tessera';

const ProjectIcon = () => {
  const [icon, setIcon] = useState<IconPickerValue>({ kind: 'icon', name: 'folder' });
  return <IconPicker label="Project icon" value={icon} onChange={setIcon} />;
};
`,
  propsHash: 'ce42bfd48e78d453',
} satisfies ComponentUsage;

export { usage };
