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
    onSubmit, history, commands, maxSuggestions, storageKey, historyLimit, value, defaultValue, onValueChange,
    sendLabel, actions, keyHints = true, size, className, 'aria-describedby': describedBy, ...field
  } = props;
  const keysId = useId();
  const controlSize = useControlSize(size);
  const command = useCommandInput({ onSubmit, history, commands, maxSuggestions, storageKey, historyLimit, value, defaultValue, onValueChange });
  const described = [describedBy, keyHints ? keysId : undefined].filter(Boolean).join(' ');
  return (
    <Box className={className ? `command-input ${className}` : 'command-input'}>
      <CommandInputRow command={command} size={controlSize} sendLabel={sendLabel} field={{ ...field, describedBy: described || undefined }} />
      {(actions !== undefined || keyHints) && (
        <Box className="command-input__footer">
          {actions !== undefined && <Box className="command-input__actions">{actions}</Box>}
          {keyHints && <CommandKeyHints id={keysId} completes={command.known} />}
        </Box>
      )}
    </Box>
  );
};

export { CommandInput };
