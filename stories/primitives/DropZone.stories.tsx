/* @layer stories @kind story */
import { useEffect, useRef, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { CONTROL_SIZES, SIZE_ARG } from '../_template/control-sizes.constants';
import { Box, DropZone, Field, Text } from '../../src/primitives';
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

const STATUS_ROWS: readonly DemonstratorAxis<'image' | 'success' | 'error'>[] = [
  { key: 'image', label: 'pictures by media type, pasted or dropped' },
  { key: 'success', label: 'status: success' },
  { key: 'error', label: 'status: error' },
];

const PictureZone = () => {
  const [name, setName] = useState<string | null>(null);
  return (
    <DropZone
      accept={['image/*']}
      label="Drop or paste a picture"
      hint="Any image type, such as a screenshot"
      status={name === null ? undefined : { tone: 'success', message: `Took ${name}` }}
      onDrop={(files) => setName(files[0]?.name ?? null)}
    />
  );
};

const Status = {
  name: 'Status and media types',
  render: () => (
    <Demonstrator
      rows={STATUS_ROWS}
      align="stretch"
      cell={(kind) => {
        if (kind === 'image') return <PictureZone />;
        if (kind === 'success') return <DropZone accept={ROM_EXTENSIONS} label="Drop a ROM here" status={{ tone: 'success', message: 'Chrono Trigger (US) is ready' }} onDrop={ignoreDrop} />;
        return <DropZone accept={ROM_EXTENSIONS} label="Drop a ROM here" status={{ tone: 'error', message: 'This file is not a ROM the game knows' }} onDrop={ignoreDrop} />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<DropZoneArgs>;

const renderState = (props: StateProps) => (
  <DropZone accept={ROM_EXTENSIONS} label="Drop a ROM here" hint="A US or Japanese copy, as .sfc or .smc" disabled={props.disabled === true} onDrop={ignoreDrop} />
);

const renderError = () => (
  <Field error="Drop a ROM before you start the session.">
    {renderState({})}
  </Field>
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
    '`block` is the tall target with a glyph, a label and a hint; `inline` is a one line box for a header row.',
    '`status` adds a success or error line under the label, and a success edge; the app sets it after a check.',
    'A file dragged in from the desktop lights the box at once; a drag of text or a link leaves it alone.',
    '**`accept` takes extensions and media types such as `image/*`:** `onDrop` gets only the files that pass.',
    '`md` and `sm` set the height of the inline box; `sm` also tightens the block.',
    'A click or [[Enter]] on the inline box opens the file dialog; [[Ctrl+V]] pastes files while pointed at.',
  ],
  playground: Playground,
  variants: [Kinds, Status, Sizes],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      { name: 'Dragging over', render: () => <DraggedOver /> },
      { ...STATE.error, render: renderError },
      STATE.disabled,
    ],
  },
});

export default meta;
export { Kinds, Overview, Playground, Sizes, Status };
