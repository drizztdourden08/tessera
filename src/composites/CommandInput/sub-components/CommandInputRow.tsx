/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { comboboxProps } from '../behavior/combobox-props';
import type { CommandInputRowProps } from '../CommandInput.type';
import { CommandSuggestions } from './CommandSuggestions';

const CommandInputRow = (props: CommandInputRowProps) => {
  const { command, size, label, sendLabel, describedBy, disabled = false, onKeyDown, field } = props;
  const { common } = useTesseraStrings();
  const { suggest } = command;
  return (
    <Box className="command-input__row">
      <Box ref={suggest.drop.anchorRef} className="command-input__anchor">
        <TextInput
          autoComplete="off"
          spellCheck={false}
          aria-label={label ?? common.command}
          aria-describedby={describedBy}
          {...field}
          {...comboboxProps(suggest)}
          className="command-input__field"
          size={size}
          start={{ icon: 'chevron-right' }}
          disabled={disabled}
          value={command.value}
          onChange={(event) => command.change(event.target.value)}
          onFocus={(event) => { field.onFocus?.(event); suggest.setFocused(true); }}
          onBlur={(event) => { field.onBlur?.(event); suggest.setFocused(false); }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (!event.defaultPrevented) command.onKeyDown(event);
          }}
        />
      </Box>
      <Button variant="primary" size={size} icon={<Icon name="send" />} disabled={disabled || !command.ready} onClick={command.send}>
        {sendLabel ?? common.send}
      </Button>
      <CommandSuggestions suggest={suggest} query={command.value} size={size} label={common.commands} onPick={command.complete} />
    </Box>
  );
};

export { CommandInputRow };
