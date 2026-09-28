/* @layer stories @kind component */
import type { StoryLiteArgs, StoryLiteArgType } from '@storylite/storylite';
import { Box, Button, Field, Text } from '../../../src/primitives';
import { ArgControl } from './ArgControl';
import { kindOf } from './control-kind';
import '../story-heading.css';
import './arg-controls.css';

interface ArgControlsProps {
  argTypes: Readonly<Record<string, StoryLiteArgType | undefined>>;
  args: StoryLiteArgs;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}

const ArgControls = (props: ArgControlsProps) => {
  const { argTypes, args, onChange, onReset } = props;
  const rows = Object.entries(argTypes).flatMap(([name, argType]) => {
    const kind = argType ? kindOf(argType, args[name]) : null;
    return argType && kind ? [{ name, argType, kind }] : [];
  });
  if (rows.length === 0) return null;
  return (
    <Box className="arg-controls">
      <Box className="arg-controls__head">
        <Text className="story-heading">Parameters</Text>
        <Button variant="ghost" size="sm" onClick={onReset}>Reset</Button>
      </Box>
      <Box className="arg-controls__grid">
        {rows.map(({ name, argType, kind }) => (
          <Field key={name} label={<Text as="span" className="arg-controls__name">{name}</Text>} hint={argType.description} htmlFor={`arg-${name}`}>
            <ArgControl id={`arg-${name}`} kind={kind} value={args[name]} options={argType.options} onChange={(value) => onChange(name, value)} />
          </Field>
        ))}
      </Box>
    </Box>
  );
};

export { ArgControls };
