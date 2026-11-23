/* @layer renderer-components @kind types */
import type { TextareaHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

type TextareaLook = 'field' | 'bare';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  size?: ControlSize;
  resize?: TextareaResize;
  look?: TextareaLook;
  autoGrow?: boolean;
  maxRows?: number;
}

export type {
  TextareaLook,
  TextareaProps,
  TextareaResize,
};
