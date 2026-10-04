/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { TextInput } from '../../TextInput';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { CommandInputRowProps } from '../CommandInput.type';

const CommandInputRow = (props: CommandInputRowProps) => {
  const { command, size, label, sendLabel, describedBy, disabled = false, onKeyDown, field } = props;
  const { common } = useTesseraStrings();
  return (
    <Box className="command-input__row">
      <TextInput
        autoComplete="off"
        spellCheck={false}
        aria-label={label ?? common.command}
        aria-describedby={describedBy}
        {...field}
        className="command-input__field"
        size={size}
        start={{ icon: 'chevron-right' }}
        disabled={disabled}
        value={command.value}
        onChange={(event) => command.change(event.target.value)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented) command.onKeyDown(event);
        }}
      />
      <Button variant="primary" size={size} icon={<Icon name="send" />} disabled={disabled || !command.ready} onClick={command.send}>
        {sendLabel ?? common.send}
      </Button>
    </Box>
  );
};

export { CommandInputRow };
