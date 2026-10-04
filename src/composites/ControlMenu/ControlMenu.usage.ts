/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A dropdown of settings behind one button: each row is a label with one compact control, and the panel joins its button like a DropdownMenu.',
  useWhen: [
    'A tool, a panel or a widget has several settings that are not worth a page of their own, such as the options behind a gear.',
    'The settings take richer controls than a menu item: a SegmentedControl, a Slider, a Select or a NumberStepper.',
    'Some settings belong together and can wait one step further, in a sub-panel beside the panel.',
  ],
  avoidWhen: [
    { case: 'Every entry is an action, an on or off check, or one choice from a short list.', use: 'DropdownMenu' },
    { case: 'The settings are many, need explanations, or are saved with the profile.', use: 'SettingsPage' },
    { case: 'The settings should stay on screen while the user works.', use: 'SettingsSection' },
  ],
  rules: [
    'One ControlMenuRow holds one control at size sm, with a short label; long explanations go in hint or about.',
    'Every control applies at once; a ControlMenu has no Save or Cancel.',
    'Group related rows with ControlMenuGroup, and move rows used less often into a ControlMenuSub.',
    'Turn filter on when the panel holds more than about eight rows; it narrows rows by label, and rows of a sub-panel show inline under its name.',
    'Name the panel with label when the trigger is an icon, such as "Players options".',
  ],
  a11y: [
    'The trigger is a button with aria-haspopup="dialog" and aria-expanded; the panel is a dialog named by label.',
    'Opening moves focus to the filter, or to the first control. Tab moves through the controls, and the arrow down key leaves the filter for the first control.',
    'Right arrow, Enter or Space on a sub-panel row opens it and focuses its first control; Escape closes the innermost panel first and gives focus back.',
    'Each row hint is read into the hint line at the bottom, and about adds an info tooltip described to screen readers.',
  ],
  tree: {
    path: ['a value the user sets', 'several settings, behind one button'],
    rule: 'ControlMenu keeps several small settings one click away without a page or a dialog.',
  },
  example: `import { ControlMenu, ControlMenuRow, ControlMenuSub, SegmentedControl, Slider, Toggle } from '@drizztdourden08/tessera';

const DENSITY = [{ value: 'cozy', label: 'Cozy' }, { value: 'compact', label: 'Compact' }];

const ViewOptions = (props: { density: string; zoom: number; sounds: boolean; onChange: (patch: object) => void }) => (
  <ControlMenu trigger={{ label: 'View options', icon: 'sliders-horizontal' }} filter>
    <ControlMenuRow label="Density" hint={{ label: 'Density', description: 'How much room each row takes' }}>
      <SegmentedControl size="sm" aria-label="Density" value={props.density} options={DENSITY} onChange={(density) => props.onChange({ density })} />
    </ControlMenuRow>
    <ControlMenuRow label="Zoom">
      <Slider size="sm" value={props.zoom} min={50} max={200} onChange={(zoom) => props.onChange({ zoom })} />
    </ControlMenuRow>
    <ControlMenuSub label="Sounds" icon="volume-2">
      <ControlMenuRow label="Play sounds">
        <Toggle size="sm" checked={props.sounds} onChange={(sounds) => props.onChange({ sounds })} aria-label="Play sounds" />
      </ControlMenuRow>
    </ControlMenuSub>
  </ControlMenu>
);
`,
  propsHash: '7755bb9c69c10d24',
} satisfies ComponentUsage;

export { usage };
