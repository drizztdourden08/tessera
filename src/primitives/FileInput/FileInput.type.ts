/* @layer renderer-components @kind types */
import type { Ref } from 'react';

interface FileInputProps {
  accept?: string[];
  multiple?: boolean;
  disabled?: boolean;
  onFiles: (files: File[]) => void;
  ref?: Ref<HTMLInputElement>;
}

export type { FileInputProps };
