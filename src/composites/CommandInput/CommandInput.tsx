/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { useControlSize } from '../../primitives/field-control/useControlSize';
import { useCommandInput } from './behavior/useCommandInput';
import { CommandInputRow } from './sub-components/CommandInputRow';
import { CommandKeyHints } from './sub-components/CommandKeyHints';
import type { CommandInputProps } from './CommandInput.type';
import './CommandInput.css';

const CommandInput = (props: CommandInputProps) => {
  const {
    onSubmit, history, storageKey, historyLimit, value, defaultValue, onValueChange,
    label, sendLabel, actions, keyHints = true, size, disabled, className, onKeyDown, ...field
  } = props;
  const keysId = useId();
  const controlSize = useControlSize(size);
  const command = useCommandInput({ onSubmit, history, storageKey, historyLimit, value, defaultValue, onValueChange });
  return (
    <Box className={className ? `command-input ${className}` : 'command-input'}>
      <CommandInputRow
        command={command}
        size={controlSize}
        label={label}
        sendLabel={sendLabel}
        describedBy={keyHints ? keysId : undefined}
        disabled={disabled}
        onKeyDown={onKeyDown}
        field={field}
      />
      {(actions !== undefined || keyHints) && (
        <Box className="command-input__footer">
          {actions !== undefined && <Box className="command-input__actions">{actions}</Box>}
          {keyHints && <CommandKeyHints id={keysId} />}
        </Box>
      )}
    </Box>
  );
};

export { CommandInput };
