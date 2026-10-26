/* @layer renderer-components @kind component */
import { Box, Span, TextInput } from '../../../primitives';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useLogInput } from '../behavior/useLogInput';
import type { LogInputProps } from './LogInput.type';

const LogInput = (props: LogInputProps) => {
  const { onInput, prompt = '>' } = props;
  const { panels } = useTesseraStrings();
  const input = useLogInput(onInput);

  return (
    <Box className="log-panel__input-row">
      <Span className="log-panel__prompt" aria-hidden="true">{prompt}</Span>
      <TextInput
        className="log-panel__input"
        aria-label={panels.logInput}
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
