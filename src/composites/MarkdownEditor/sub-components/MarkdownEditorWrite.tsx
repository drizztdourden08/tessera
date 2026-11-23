/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Textarea } from '../../../primitives/Textarea';
import { areaLook } from '../behavior/area-look';
import { rowsOf } from '../behavior/rows-of';
import type { MarkdownEditorWriteProps } from './MarkdownEditorWrite.type';

const MarkdownEditorWrite = (props: MarkdownEditorWriteProps) => {
  const { areaRef, hidden, composer, compact, rows, value, label, placeholder, disabled, maxLength, onChange, extra } = props;
  return (
    <Box className="markdown-editor__write" hidden={hidden}>
      <Textarea
        ref={areaRef}
        aria-label={label}
        value={value}
        rows={rowsOf(rows, compact || composer)}
        {...areaLook(composer)}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        {...extra}
      />
    </Box>
  );
};

export { MarkdownEditorWrite };
