/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { CodeView } from '../../../primitives/code-view/CodeView';
import { useFieldControl } from '../../../primitives/Field/behavior/useFieldControl';
import { Textarea } from '../../../primitives/Textarea';
import { shownCode } from '../behavior/shown-code';
import type { CodeBlockEditProps } from '../CodeBlock.type';

const CodeEditor = (props: CodeBlockEditProps) => {
  const { value, onChange, language, invalid, problemLine, readOnly, disabled, className } = props;
  const control = useFieldControl();
  const marked = invalid === true || control.invalid === true;
  return (
    <Box className={['code-block-editor', className].filter(Boolean).join(' ')} data-invalid={marked || undefined} data-disabled={disabled === true || undefined}>
      <Box className="code-block-editor__code" aria-hidden>
        <CodeView code={shownCode(value)} language={language} wrap highlightedLines={problemLine ? [problemLine] : undefined} />
      </Box>
      <Textarea
        id={props.id}
        aria-label={props['aria-label']}
        aria-labelledby={props['aria-label'] ? undefined : control.labelId}
        aria-describedby={props['aria-describedby']}
        invalid={marked || undefined}
        readOnly={readOnly}
        disabled={disabled}
        className="code-block-editor__text"
        value={value}
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

export { CodeEditor };
