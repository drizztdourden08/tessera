/* @layer renderer-components @kind types */
import type { TextareaHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  size?: ControlSize;
  resize?: TextareaResize;
}

export type {
  TextareaProps,
  TextareaResize,
};
