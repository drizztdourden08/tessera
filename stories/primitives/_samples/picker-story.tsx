/* @layer stories @kind component */
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteArgs, StoryLiteArgTypes, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Combobox, Field, Select } from '../../../src/primitives';
import { STATE } from '../../_template/states/states.constants';
import type { OverviewStates } from '../../_template/states/states.type';
import { REGIONS } from './picker-data';

type PickerKind = 'select' | 'combobox';

type PickerArgs = {
  min: number;
  max: number;
  loading: boolean;
  size: 'md' | 'sm';
  disabled: boolean;
  invalid: boolean;
};

type RegionPickerProps = { kind: PickerKind; initial: string | null; open?: boolean; disabled?: boolean };

type StateTargets = { field?: string; input?: string };

const PICKER_ARG_TYPES: StoryLiteArgTypes<PickerArgs> = {
  min: { control: 'number', description: 'How many must stay picked. 0 lets the user clear the field.' },
  max: { control: 'number', description: 'How many can be picked. Above 1, each row gets a checkbox.' },
  loading: { control: 'boolean' },
  size: { control: 'select', options: ['md', 'sm'] },
  disabled: { control: 'boolean' },
  invalid: { control: 'boolean', description: 'Draws the error look. A Field with an error sets it on its own.' },
};

const pickerVariant = <A extends StoryLiteArgs>(name: string, Render: () => ReactNode): StoryLiteStoryDefinition<A> => ({
  name,
  render: () => <Render />,
});

const RegionPicker = (props: RegionPickerProps) => {
  const { kind, initial, open, disabled } = props;
  const [value, setValue] = useState(initial);
  const shared = { items: REGIONS, value, onChange: setValue, defaultOpen: open, inline: open, disabled };
  return kind === 'select'
    ? <Select {...shared} placeholder="Pick a region" />
    : <Combobox {...shared} placeholder="Type a region" />;
};

const pickerStates = (kind: PickerKind, targets: StateTargets): OverviewStates => ({
  render: (props) => (
    <RegionPicker kind={kind} initial={props.filled === true ? 'Eastern Palace' : null} open={props.open === true} disabled={props.disabled === true} />
  ),
  list: [
    STATE.idle,
    { ...STATE.hover, target: targets.field },
    { ...STATE.focus, target: targets.input },
    { name: 'Filled', props: { filled: true } },
    { ...STATE.open, pseudo: targets.input === undefined ? undefined : 'focus-visible', target: targets.input, props: { open: true, filled: true } },
    {
      ...STATE.error,
      render: () => (
        <Field error="Name the region the run starts in.">
          <RegionPicker kind={kind} initial={null} />
        </Field>
      ),
    },
    { ...STATE.disabled, props: { disabled: true, filled: true } },
  ],
});

export { PICKER_ARG_TYPES, pickerStates, pickerVariant };
export type { PickerArgs };
