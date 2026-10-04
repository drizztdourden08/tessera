/* @layer stories @kind component */
import { useRef } from 'react';
import { Box, Field, Icon, IconButton, Text } from '../../../src/primitives';
import { ArgControl } from './ArgControl';
import type { ArgRow } from './playground.type';

interface ArgFieldProps {
  row: ArgRow;
  args: Readonly<Record<string, unknown>>;
  modified: boolean;
  onChange: (name: string, value: unknown) => void;
  onReset: (name: string) => void;
}

const FOCUSABLE = 'input, textarea, button, [tabindex]:not([tabindex="-1"])';

const ArgField = (props: ArgFieldProps) => {
  const { row, args, modified, onChange, onReset } = props;
  const { name, argType } = row;
  const id = `arg-${name}`;
  const control = useRef<HTMLElement>(null);
  const reset = () => {
    onReset(name);
    control.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  };
  const label = (
    <Text as="span" className="arg-field__name">
      {name}
      {modified && <Text as="span" className="arg-field__dot" role="img" aria-label="changed" />}
    </Text>
  );
  return (
    <Field className={`arg-field${modified ? ' arg-field--modified' : ''}`} size="sm" label={label} htmlFor={id} hint={argType.description}>
      <Box className="arg-field__row">
        <Box className="arg-field__control" ref={control}>
          <ArgControl id={id} row={row} value={args[name]} args={args} onChange={(value) => onChange(name, value)} />
        </Box>
        <Box className="arg-field__reset">
          {modified && (
            <IconButton size="sm" variant="ghost" label={`Reset ${name}`} onClick={reset}>
              <Icon name="rotate-ccw" size={14} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Field>
  );
};

export { ArgField };
