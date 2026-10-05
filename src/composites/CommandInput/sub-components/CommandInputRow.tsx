/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Combobox } from '../../../primitives/Combobox';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { COMMAND_COLUMNS } from '../behavior/command-columns.constants';
import { COMMAND_PROMPT } from '../CommandInput.constants';
import type { CommandEntry, CommandInputRowProps } from '../CommandInput.type';

const CommandInputRow = (props: CommandInputRowProps) => {
  const { command, size, sendLabel, field } = props;
  const { common } = useTesseraStrings();
  const disabled = field.disabled === true;
  return (
    <Box className="command-input__row">
      <Combobox<CommandEntry, 'command'>
        freeText
        className="command-input__field"
        id={field.id}
        aria-label={field.label ?? common.command}
        aria-describedby={field.describedBy}
        listLabel={common.commands}
        placeholder={field.placeholder}
        invalid={field.invalid}
        disabled={disabled}
        size={size}
        start={COMMAND_PROMPT}
        items={command.hits}
        getKey="command"
        getLabel="command"
        valueField="command"
        value={null}
        onChange={command.complete}
        columns={COMMAND_COLUMNS}
        filter={false}
        highlight={false}
        query={command.value}
        onQueryChange={command.change}
        onKeyDown={(event, list) => {
          field.onKeyDown?.(event);
          if (!event.defaultPrevented) command.onKeyDown(event, list);
        }}
      />
      <Button variant="primary" size={size} icon={<Icon name="send" />} disabled={disabled || !command.ready} onClick={command.send}>
        {sendLabel ?? common.send}
      </Button>
    </Box>
  );
};

export { CommandInputRow };
