/* @layer stories @kind story */
import { useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ColorPickerPopover } from '../../src/composites/ColorPickerPopover';
import { Box, ColorSwatch, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { SWATCH_GROUPS, TEAMS } from './_samples/data-colors';
import type { TeamColour } from './_samples/data-colors';
import { ColorPopoverPlayground } from './_samples/ColorPopoverPlayground';
import type { ColorPopoverPlaygroundProps } from './_samples/ColorPopoverPlayground';

type PopoverArgs = ColorPopoverPlaygroundProps;

const TeamPalette = ({ disableAlpha }: Pick<PopoverArgs, 'disableAlpha'>) => {
  const [teams, setTeams] = useState<readonly TeamColour[]>(TEAMS);
  const [editing, setEditing] = useState<string | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const current = teams.find((team) => team.id === editing);
  const original = TEAMS.find((team) => team.id === editing);

  const setColour = (color: string) =>
    setTeams((prev) => prev.map((team) => (team.id === editing ? { ...team, hex: color } : team)));

  return (
    <Box className="story-column">
      <Text className="story-label">Click a team to recolour it</Text>
      <Box className="story-row">
        {teams.map((team) => (
          <Box key={team.id} className="story-column">
            <ColorSwatch
              color={team.hex}
              selected={team.id === editing}
              edited={team.hex !== TEAMS.find((t) => t.id === team.id)?.hex}
              aria-label={`Recolour ${team.name}`}
              onClick={(event) => {
                anchorRef.current = event.currentTarget.parentElement;
                setEditing(team.id);
              }}
            />
            <Text className="story-label">{team.name}</Text>
          </Box>
        ))}
      </Box>
      <ColorPickerPopover
        open={current !== undefined}
        anchorRef={anchorRef}
        onClose={() => setEditing(null)}
        title={current ? `Team ${current.name}` : undefined}
        value={current?.hex ?? '#000000'}
        onChange={setColour}
        disableAlpha={disableAlpha}
        original={original?.hex}
        onReset={original ? () => setColour(original.hex) : undefined}
        swatchGroups={SWATCH_GROUPS}
      />
    </Box>
  );
};

const ARGS: Partial<PopoverArgs> = { disableAlpha: true };

const ARG_TYPES: StoryLiteArgTypes<PopoverArgs> = {
    disableAlpha: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Inputs/ColorPickerPopover',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PopoverArgs>;

const PLAYGROUND_ARGS: Partial<PopoverArgs> = {
  title: 'Team Lanterns', start: '#e0a13c', disableAlpha: true, showOriginal: true, showSwatches: true, startOpen: false,
};

const PLAYGROUND_ARG_TYPES: StoryLiteArgTypes<PopoverArgs> = {
  title: { control: 'text', description: 'The heading inside the panel.' },
  start: { control: 'color', description: 'The colour the swatch holds when the page loads; also the Reset target.' },
  disableAlpha: { control: 'boolean', description: 'Hide the alpha slider and field.' },
  showOriginal: { control: 'boolean', description: 'Pass original and onReset, so the panel shows the start colour and a Reset button.' },
  showSwatches: { control: 'boolean', description: 'Pass swatchGroups for quick picks.' },
  startOpen: { control: 'boolean', description: 'Open the panel on load, without a press on the swatch.' },
};

const Playground = {
  name: 'Playground',
  args: PLAYGROUND_ARGS,
  argTypes: PLAYGROUND_ARG_TYPES,
  render: (args) => <ColorPopoverPlayground key={`${args.start}-${args.startOpen ? 'open' : 'shut'}`} {...args} />,
} satisfies StoryLiteStoryDefinition<PopoverArgs>;

const TeamColours = {
  name: 'Team colours',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <TeamPalette {...args} />,
} satisfies StoryLiteStoryDefinition<PopoverArgs>;

const CODE = `// Left out of the package barrel, so react-color loads only where a picker is used.
import { ColorPickerPopover } from '@drizztdourden08/tessera/color-picker-popover';
import { Box, ColorSwatch } from '@drizztdourden08/tessera';

const anchorRef = useRef<HTMLDivElement | null>(null);
const [open, setOpen] = useState(false);
const [color, setColor] = useState('#3f8fd2');

<Box ref={anchorRef}>
  <ColorSwatch color={color} onClick={() => setOpen(true)} />
</Box>
<ColorPickerPopover
  open={open}
  anchorRef={anchorRef}
  onClose={() => setOpen(false)}
  title="Team Harbor"
  value={color}
  onChange={setColor}
  disableAlpha
/>`;

const Overview = overviewStory({
  component: 'ColorPickerPopover',
  description: 'The ColorPicker as a floating panel beside the swatch that opened it. Reach for it in a palette of many swatches, where an inline picker would take too much room. It floats above any dialog so nothing clips it, stays inside the viewport, and closes on Escape, on a click outside, and when its swatch scrolls out of view. It takes every ColorPicker option, with a Done button that closes it.',
  playground: Playground,
  variants: [TeamColours],
  code: CODE,
});

export default meta;
export { Overview, Playground, TeamColours };
