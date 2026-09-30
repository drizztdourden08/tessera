/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, ButtonGroup, Icon, IconButton } from '../../src/primitives';
import type { ButtonGroupOrientation, ButtonSize, ButtonVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { forceAttributes } from '../_template/states/force-attributes';
import type { StateEntry, StateProps } from '../_template/states/states.type';
import { BUTTON_STATES } from './_samples/button-states';

type ButtonGroupArgs = {
  variant: ButtonVariant;
  size: ButtonSize;
  orientation: ButtonGroupOrientation;
  disabled: boolean;
};

const VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'info', 'success', 'ghost'];

const SIZES: readonly ButtonSize[] = ['md', 'sm'];

const ARGS: Partial<ButtonGroupArgs> = { variant: 'tertiary', size: 'md', orientation: 'horizontal', disabled: false };

const ARG_TYPES: StoryLiteArgTypes<ButtonGroupArgs> = {
  variant: { control: 'select', options: [...VARIANTS], description: 'Set on each button; the group keeps the look of its buttons.' },
  size: { control: 'select', options: [...SIZES], description: 'Set on each button.' },
  orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  disabled: { control: 'boolean', description: 'Disables the middle button.' },
};

const meta = {
  title: 'Primitives · Actions/ButtonGroup',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ButtonGroupArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ButtonGroup aria-label="Save state" orientation={args.orientation}>
      <Button variant={args.variant} size={args.size}>Save</Button>
      <Button variant={args.variant} size={args.size} disabled={args.disabled || undefined}>Load</Button>
      <Button variant={args.variant} size={args.size}>Reset</Button>
    </ButtonGroup>
  ),
} satisfies StoryLiteStoryDefinition<ButtonGroupArgs>;

const AllVariants = {
  name: 'All variants',
  render: () => (
    <Demonstrator
      rows={axis(VARIANTS)}
      cell={(variant) => (
        <ButtonGroup aria-label={`Save state, ${variant}`}>
          <Button variant={variant}>Save</Button>
          <Button variant={variant}>Load</Button>
          <Button variant={variant}>Reset</Button>
        </ButtonGroup>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonGroupArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <ButtonGroup aria-label={`Map zoom, ${size}`}>
          <Button size={size} variant="secondary">Zoom out</Button>
          <Button size={size} variant="secondary">Fit</Button>
          <Button size={size} variant="secondary">Zoom in</Button>
        </ButtonGroup>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<ButtonGroupArgs>;

const WithIcons = {
  name: 'With icon buttons',
  render: () => (
    <Box className="story-column">
      <ButtonGroup aria-label="History">
        <IconButton variant="tertiary" size="md" label="Undo"><Icon name="undo-2" size={16} /></IconButton>
        <IconButton variant="tertiary" size="md" label="Redo"><Icon name="redo-2" size={16} /></IconButton>
        <IconButton variant="tertiary" size="md" label="Revert all"><Icon name="rotate-ccw" size={16} /></IconButton>
      </ButtonGroup>
      <ButtonGroup aria-label="Tracker">
        <IconButton label="Pin tracker"><Icon name="pin" size={12} /></IconButton>
        <IconButton label="Copy seed"><Icon name="copy" size={12} /></IconButton>
        <IconButton label="More actions"><Icon name="ellipsis" size={12} /></IconButton>
      </ButtonGroup>
      <ButtonGroup aria-label="Session">
        <Button variant="primary" icon={<Icon name="play" />}>Start</Button>
        <IconButton variant="primary" size="md" label="Session options"><Icon name="chevron-down" size={16} /></IconButton>
      </ButtonGroup>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ButtonGroupArgs>;

const Vertical = {
  name: 'Vertical',
  render: () => (
    <Box className="story-row">
      <ButtonGroup aria-label="Export" orientation="vertical">
        <Button variant="secondary">Export log</Button>
        <Button variant="secondary">Copy seed</Button>
        <Button variant="secondary">Share room</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Move widget" orientation="vertical">
        <IconButton variant="tertiary" size="md" label="Move up"><Icon name="arrow-up" size={16} /></IconButton>
        <IconButton variant="tertiary" size="md" label="Move down"><Icon name="arrow-down" size={16} /></IconButton>
      </ButtonGroup>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ButtonGroupArgs>;

const Mixed = {
  name: 'Mixed variants',
  render: () => (
    <ButtonGroup aria-label="Changes">
      <Button variant="primary">Apply</Button>
      <Button variant="tertiary">Preview</Button>
      <Button variant="danger">Discard</Button>
    </ButtonGroup>
  ),
} satisfies StoryLiteStoryDefinition<ButtonGroupArgs>;

const renderState = (middle: StateProps, pseudo?: StateEntry['pseudo']) => (
  <ButtonGroup aria-label="Save state">
    <Button variant="tertiary">Save</Button>
    <Button variant="tertiary" {...forceAttributes(pseudo)} {...middle}>Load</Button>
    <Button variant="tertiary">Reset</Button>
  </ButtonGroup>
);

const middleState = (entry: StateEntry): StateEntry => ({
  name: entry.name,
  render: () => renderState(entry.props ?? {}, entry.pseudo),
});

const Overview = overviewStory({
  component: 'ButtonGroup',
  description: 'Buttons joined into one control, for a few independent actions that belong together: save, load and reset, or undo and redo. It takes Button and IconButton children with no gap between them. Neighbours share one border and only the outer corners keep the button radius. A hovered, pressed or focused button rises above its neighbours, so its border and focus ring stay whole; the States show it on the middle button. Each button keeps its own variant, size and disabled state, and a ghost button gains a border inside a group. Orientation stacks the buttons in a column. Give the group an aria-label: it renders a group, and screen readers announce the label with the buttons. For one choice out of several, use SegmentedControl; for independent on and off settings, use ToggleGroup; for spaced buttons, use ButtonRow.',
  playground: Playground,
  variants: [AllVariants, Sizes, WithIcons, Vertical, Mixed],
  states: {
    render: (props) => renderState(props),
    list: BUTTON_STATES.map(middleState),
  },
});

export default meta;
export { AllVariants, Mixed, Overview, Playground, Sizes, Vertical, WithIcons };
