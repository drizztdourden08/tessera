/* @layer renderer-components @kind component */
import type { CommandInputLineProps } from '../CommandInput.type';
import { CommandInputRow } from './CommandInputRow';
import { CommandSpecPicker } from './CommandSpecPicker';
import { CommandSpecRow } from './CommandSpecRow';

const CommandInputLine = (props: CommandInputLineProps) => {
  const { command, specs, commandSpecs, size, sendLabel, field } = props;
  const disabled = field.disabled === true;
  const picker = commandSpecs === undefined ? undefined : <CommandSpecPicker specs={commandSpecs} size={size} disabled={disabled} onPick={specs.pick} />;
  if (specs.spec === null) return <CommandInputRow command={command} size={size} sendLabel={sendLabel} field={field} picker={picker} />;
  return <CommandSpecRow command={command} specs={specs} picker={picker} size={size} disabled={disabled} />;
};

export { CommandInputLine };
