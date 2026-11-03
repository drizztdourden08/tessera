/* @layer renderer-components @kind hook */
import type { CommandControl, CommandLineState, CommandSpecControl } from '../CommandInput.type';
import { useCommandInput } from './useCommandInput';
import { useCommandSpec } from './useCommandSpec';

const useCommandLine = (props: CommandLineState): { command: CommandControl; specs: CommandSpecControl } => {
  const { commandSpecs, value, onValueChange, ...rest } = props;
  const specs = useCommandSpec(commandSpecs);
  const active = specs.spec !== null;
  const command = useCommandInput({ ...rest, value: active ? specs.text : value, onValueChange: active ? specs.reset : onValueChange });
  return { command, specs };
};

export { useCommandLine };
