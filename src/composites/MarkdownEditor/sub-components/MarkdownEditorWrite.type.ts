/* @layer renderer-components @kind types */
import type { Ref } from 'react';
import type { TextareaProps } from '../../../primitives/Textarea';

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

export type { MarkdownEditorWriteProps };
