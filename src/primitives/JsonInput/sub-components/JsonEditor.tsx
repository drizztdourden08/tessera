/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { CodeBlock } from '../../CodeBlock';
import { Textarea } from '../../Textarea';
import { shownCode } from '../behavior/shown-code';
import type { JsonEditorProps } from '../JsonInput.type';

const JsonEditor = ({ text, errorLine, inputRef, textarea }: JsonEditorProps) => {
  const { onChange, ...rest } = textarea;
  return (
    <Box className="json-input__editor" data-invalid={rest['aria-invalid'] ?? undefined}>
      <Box className="json-input__code" aria-hidden>
        <CodeBlock code={shownCode(text)} language="json" wrap highlightedLines={errorLine ? [errorLine] : undefined} />
      </Box>
      <Textarea
        {...rest}
        ref={inputRef}
        className="json-input__text"
        value={text}
        resize="none"
        rows={1}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
    </Box>
  );
};

export { JsonEditor };
