/* @layer stories @kind component */
import type { ChangeEvent } from 'react';
import { ColorSwatch, Flex, NumberInput, Slider, TextInput, Textarea, Toggle } from '../../../src/primitives';
import { ArgChoice } from './ArgChoice';
import type { ArgRow } from './playground.type';

interface ArgControlProps {
  id: string;
  row: ArgRow;
  value: unknown;
  args: Readonly<Record<string, unknown>>;
  onChange: (value: unknown) => void;
}

const textOf = (value: unknown): string => (value === undefined || value === null ? '' : String(value));

const numberOf = (value: unknown): number => (typeof value === 'number' ? value : 0);

const ArgControl = (props: ArgControlProps) => {
  const { id, row, value, args, onChange } = props;
  const { name, kind, argType, options } = row;
  const { min, max, step, optionView } = argType;
  const onText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value);
  if (kind === 'boolean') return <Toggle id={id} size="sm" checked={value === true} onChange={onChange} />;
  if (kind === 'number') return <NumberInput id={id} size="sm" value={numberOf(value)} min={min} max={max} step={step} onChange={onChange} />;
  if (kind === 'range') {
    return <Slider id={id} aria-label={name} size="sm" value={numberOf(value)} min={min} max={max} step={step} showValue onChange={onChange} />;
  }
  if (kind === 'textarea') return <Textarea id={id} size="sm" value={textOf(value)} onChange={onText} rows={1} resize="vertical" />;
  if (kind === 'color') {
    return (
      <Flex gap="sm" align="center">
        <ColorSwatch color={textOf(value)} size="sm" tabIndex={-1} aria-hidden />
        <TextInput id={id} size="sm" value={textOf(value)} onChange={onText} />
      </Flex>
    );
  }
  if (kind === 'text') return <TextInput id={id} size="sm" value={textOf(value)} onChange={onText} />;
  const view = optionView && ((option: unknown) => optionView(option, args));
  return <ArgChoice id={id} name={name} kind={kind} value={value} options={options} optionView={view} onChange={onChange} />;
};

export { ArgControl };
