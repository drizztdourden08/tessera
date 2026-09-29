/* @layer stories @kind story */
import { useEffect, useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, DropZone, Text } from '../../src/primitives';
import type { DropZoneProps, DropZoneVariant } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type DropZoneArgs = {
  label: string;
  hint: string;
  variant: DropZoneVariant;
  romsOnly: boolean;
  disabled: boolean;
};

const ROM_EXTENSIONS = ['.sfc', '.smc'];

const ignoreDrop = () => undefined;

const ARGS: Partial<DropZoneArgs> = {
    label: 'Drop a ROM here',
    hint: 'A US or Japanese copy, as .sfc or .smc',
    variant: 'block',
    romsOnly: true,
    disabled: false,
  };

const ARG_TYPES: StoryLiteArgTypes<DropZoneArgs> = {
    label: { control: 'text' },
    hint: { control: 'text' },
    variant: { control: 'select', options: ['block', 'inline'] },
    romsOnly: { control: 'boolean', description: 'Passes accept, so other files are dropped silently.' },
    disabled: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Inputs/DropZone',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DropZoneArgs>;

type StatefulDropZoneProps = Omit<DropZoneProps, 'onDrop'>;

const StatefulDropZone = (props: StatefulDropZoneProps) => {
  const { accept, label, hint, variant, icon, disabled } = props;
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
      onDrop={ignoreDrop}
    />
  ),
} satisfies StoryLiteStoryDefinition<DropZoneArgs>;

const Kinds = {
  name: 'Kinds',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">block, defaults</Text>
      <StatefulDropZone />
      <Text className="story-label">block, ROMs only, custom glyph</Text>
      <StatefulDropZone accept={ROM_EXTENSIONS} label="Drop a ROM here" hint="A US or Japanese copy" icon={'\u{1F3AE}'} />
      <Text className="story-label">inline, for a header row</Text>
      <StatefulDropZone variant="inline" accept={['.json']} label="Import a session file" hint="A .json exported from another machine" />
    </Box>
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
    if (zone && view) zone.dispatchEvent(new view.DragEvent('dragenter', { bubbles: true }));
  }, []);
  return <Box ref={ref}>{renderState({})}</Box>;
};

const Overview = overviewStory({
  component: 'DropZone',
  description: 'A target for files, dragged in or picked with a click, which opens the file browser. Block is the tall target with a glyph, a label and a hint; inline is a one line dashed box that fits a header row and opens the picker from the keyboard too. With accept set, files of other types are dropped without a word, and onDrop gets only the files that pass.',
  playground: Playground,
  variants: [Kinds],
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
export { Kinds, Overview, Playground };
