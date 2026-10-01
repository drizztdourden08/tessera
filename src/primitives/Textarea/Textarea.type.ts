/* @layer renderer-components @kind types */
import type { TextareaHTMLAttributes } from 'react';
import type { ControlSize } from '../field-control/field-control.type';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  size?: ControlSize;
}

export type {
  TextareaProps,
};
