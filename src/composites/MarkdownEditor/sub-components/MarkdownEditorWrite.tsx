/* @layer renderer-components @kind component */
import type { Ref } from 'react';
import { Box } from '../../../primitives/Box';
import { Textarea } from '../../../primitives/Textarea';
import type { TextareaProps } from '../../../primitives/Textarea';
import { areaLook } from '../behavior/area-look';
import { rowsOf } from '../behavior/rows-of';

type MarkdownEditorWriteProps = {
  areaRef: Ref<HTMLTextAreaElement>;
  hidden: boolean;
  composer: boolean;
  compact: boolean;
  rows: number | undefined;
  value: string;
  label: string | undefined;
  placeholder: string | undefined;
  disabled: boolean;
  maxLength: number | undefined;
  onChange: (value: string) => void;
  extra: Pick<TextareaProps, 'onKeyDown' | 'onPaste' | 'onDragOver' | 'onDrop'>;
};

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
