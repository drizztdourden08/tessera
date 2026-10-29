/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Span } from '../../../primitives/text-elements';
import { TextInput } from '../../../primitives/TextInput';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useLogInput } from '../behavior/useLogInput';
import { NO_INPUT } from './LogInput.constants';
import type { LogInputProps } from './LogInput.type';

const LogInput = (props: LogInputProps) => {
  const { onInput, prompt = '>', disabled, placeholder } = props;
  const { panels } = useTesseraStrings();
  const input = useLogInput(onInput ?? NO_INPUT);

  return (
    <Box className="log-panel__input-row">
      <Span className="log-panel__prompt" aria-hidden="true">{prompt}</Span>
      <TextInput
        className="log-panel__input"
        aria-label={panels.logInput}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        value={input.value}
        onChange={(event) => input.type(event.target.value)}
        onKeyDown={input.onKeyDown}
        onEnter={input.submit}
      />
    </Box>
  );
};

export { LogInput };
