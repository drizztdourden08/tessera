/* @layer stories @kind component */
import type { ChangeEvent } from 'react';
import { ColorSwatch, Flex, NumberInput, Select, TextInput, Textarea, Toggle } from '../../../src/primitives';
import type { ControlKind } from './control-kind';

interface ArgControlProps {
  id: string;
  kind: ControlKind;
  value: unknown;
  options?: readonly unknown[];
  onChange: (value: unknown) => void;
}

const textOf = (value: unknown): string => (value === undefined || value === null ? '' : String(value));

const ArgControl = (props: ArgControlProps) => {
  const { id, kind, value, options = [], onChange } = props;
  const onText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value);
  if (kind === 'boolean') return <Toggle id={id} checked={value === true} onChange={onChange} />;
  if (kind === 'number') return <NumberInput id={id} value={typeof value === 'number' ? value : 0} onChange={onChange} />;
  if (kind === 'textarea') return <Textarea id={id} value={textOf(value)} onChange={onText} rows={3} />;
  if (kind === 'select') {
    const choices = options.map((option, index) => ({ value: String(index), label: textOf(option) || '(none)' }));
    return <Select value={String(options.indexOf(value))} options={choices} onChange={(index) => onChange(options[Number(index)])} size="sm" />;
  }
  if (kind === 'color') {
    return (
      <Flex gap="sm" align="center">
        <ColorSwatch color={textOf(value)} tabIndex={-1} aria-hidden />
        <TextInput id={id} value={textOf(value)} onChange={onText} />
      </Flex>
    );
  }
  return <TextInput id={id} value={textOf(value)} onChange={onText} />;
};

export { ArgControl };
