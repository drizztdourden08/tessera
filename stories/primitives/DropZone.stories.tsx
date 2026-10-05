/* @layer stories @kind story */
import { useEffect, useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, DropZone, Text } from '../../src/primitives';
import type { ControlSize, DropZoneProps, DropZoneVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import type { DemonstratorAxis } from '../_template/Demonstrator.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type DropZoneArgs = {
  label: string;
  hint: string;
  variant: DropZoneVariant;
  romsOnly: boolean;
  disabled: boolean;
  size: ControlSize;
};

const ROM_EXTENSIONS = ['.sfc', '.smc'];

const ignoreDrop = () => undefined;

const ARGS: Partial<DropZoneArgs> = {
    label: 'Drop a ROM here',
    hint: 'A US or Japanese copy, as .sfc or .smc',
    variant: 'block',
    romsOnly: true,
    disabled: false,
    size: 'md',
  };

const ARG_TYPES: PlaygroundArgTypes<DropZoneArgs> = {
    label: { group: 'Content', control: 'text' },
    hint: { group: 'Content', control: 'text' },
    variant: { group: 'Appearance', control: 'select', options: ['block', 'inline'] },
    disabled: { group: 'State', control: 'boolean' },
    romsOnly: { group: 'Behaviour', control: 'boolean', description: 'Passes accept, so other files are dropped silently.' },
    size: SIZE_ARG,
  };

const KINDS: readonly DemonstratorAxis<'defaults' | 'roms' | 'inline'>[] = [
  { key: 'defaults', label: 'block, defaults' },
  { key: 'roms', label: 'block, ROMs only, custom glyph' },
  { key: 'inline', label: 'inline, for a header row' },
];

const meta = {
  title: 'Primitives · Inputs/DropZone',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DropZoneArgs>;

type StatefulDropZoneProps = Omit<DropZoneProps, 'onDrop'>;

const StatefulDropZone = (props: StatefulDropZoneProps) => {
  const { accept, label, hint, variant, icon, disabled, size } = props;
  const [files, setFiles] = useState<readonly string[]>([]);
  return (
    <Box className="story-column">
      <DropZone
        accept={accept}
        label={label}
        hint={hint}
        variant={variant}
        icon={icon}
        disabled={disabled}
        size={size}
        onDrop={(dropped) => setFiles(dropped.map((file) => file.name))}
      />
      <Text className="story-label">Received: {files.length === 0 ? 'nothing yet' : files.join(', ')}</Text>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <DropZone
      accept={args.romsOnly ? ROM_EXTENSIONS : undefined}
      label={args.label}
      hint={args.hint === '' ? undefined : args.hint}
      variant={args.variant}
      disabled={args.disabled}
      size={args.size}
      onDrop={ignoreDrop}
    />
  ),
} satisfies PlaygroundStory<DropZoneArgs>;

const Kinds = {
  name: 'Kinds',
  render: () => (
    <Demonstrator
      rows={KINDS}
      align="stretch"
      cell={(kind) => {
        if (kind === 'roms') return <StatefulDropZone accept={ROM_EXTENSIONS} label="Drop a ROM here" hint="A US or Japanese copy" icon={'\u{1F3AE}'} />;
        if (kind === 'inline') return <StatefulDropZone variant="inline" accept={['.json']} label="Import a session file" hint="A .json exported from another machine" />;
        return <StatefulDropZone />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<DropZoneArgs>;

const Sizes = {
  name: 'Sizes',
  render: () => (
    <Demonstrator
      rows={axis(CONTROL_SIZES)}
      columns={axis(['block', 'inline'])}
      valign="start"
      cell={(size, variant) => (
        <Box>
          <DropZone size={size} variant={variant === 'inline' ? 'inline' : 'block'} accept={ROM_EXTENSIONS} label="Drop a ROM here" hint="A US or Japanese copy" onDrop={ignoreDrop} />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<DropZoneArgs>;

const renderState = (props: StateProps) => (
  <DropZone accept={ROM_EXTENSIONS} label="Drop a ROM here" hint="A US or Japanese copy, as .sfc or .smc" disabled={props.disabled === true} onDrop={ignoreDrop} />
);

const DraggedOver = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const zone = ref.current?.firstElementChild;
    const view = zone?.ownerDocument.defaultView;
    if (!zone || !view) return;
    const dataTransfer = new view.DataTransfer();
    dataTransfer.items.add(new view.File([''], 'Chrono Trigger.sfc'));
    zone.dispatchEvent(new view.DragEvent('dragenter', { bubbles: true, dataTransfer }));
  }, []);
  return <Box ref={ref}>{renderState({})}</Box>;
};

const Overview = overviewStory({
  component: 'DropZone',
  description: 'A target for files, dragged in or picked with a click that opens the file browser.',
  points: [
    '`block` is the tall target with a glyph, a label and a hint.',
    '`inline` is a one line dashed box that fits a header row.',
    '**With `accept` set, other files are dropped silently:** `onDrop` gets only the files that pass.',
    '`md` and `sm` set the height of the inline box; `sm` also tightens the block.',
  ],
  playground: Playground,
  variants: [Kinds, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { name: 'Dragging over', render: () => <DraggedOver /> },
      STATE.disabled,
    ],
  },
});

export default meta;
export { Kinds, Overview, Playground, Sizes };
