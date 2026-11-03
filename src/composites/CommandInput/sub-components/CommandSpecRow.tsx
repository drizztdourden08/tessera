/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { specKey } from '../behavior/spec-key';
import type { CommandSpecRowProps } from '../CommandInput.type';
import { CommandPatternField } from './CommandPatternField';
import { CommandSpecFields } from './CommandSpecFields';

const CommandSpecRow = ({ command, specs, picker, size, disabled }: CommandSpecRowProps) => {
  const { commandInput } = useTesseraStrings();
  const { spec } = specs;
  if (spec === null) return null;
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const action = specKey(event, specs.blank, command.ready);
    if (action === null) return;
    event.preventDefault();
    if (action === 'send') {
      command.send();
      return;
    }
    event.stopPropagation();
    specs.clear();
  };
  const rowClass = spec.pattern === undefined ? 'command-input__row command-input__row--spec' : 'command-input__row command-input__row--pattern';
  return (
    <Box className={rowClass} role="group" aria-label={commandInput.fieldsLabel(spec.label)} onKeyDown={onKeyDown}>
      {picker}
      {spec.pattern === undefined
        ? <CommandSpecFields spec={spec} values={specs.values} size={size} disabled={disabled} onValue={specs.setValue} />
        : <CommandPatternField spec={spec} values={specs.values} size={size} disabled={disabled} onValues={specs.setValues} />}
      <IconButton variant="ghost" size={size} label={commandInput.clear} disabled={disabled} onClick={specs.clear}>
        <Icon name="x" />
      </IconButton>
      <Button variant="primary" size={size} icon={<Icon name="send" />} disabled={disabled || !command.ready} onClick={command.send}>
        {commandInput.sendNamed(spec.label)}
      </Button>
    </Box>
  );
};

export { CommandSpecRow };
