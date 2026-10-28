/* @layer renderer-components @kind types */
import type { NumberFieldProps } from '../NumberField';
import type { ScrubHandlers } from '../NumberField/NumberField.type';

interface AngleFieldProps extends Pick<NumberFieldProps, 'label' | 'size' | 'disabled' | 'mixed' | 'id' | 'aria-label' | 'className'> {
  value: number;
  onChange: (value: number) => void;
  snap?: number;
  dial?: boolean;
}

interface DialPoint {
  x: number;
  y: number;
}

interface DialRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface DialDragParams {
  enabled: boolean;
  snap: number | undefined;
  onChange: (value: number) => void;
}

type DialHandlers = ScrubHandlers;

interface AngleDialProps {
  value: number;
  mixed: boolean;
  handlers: DialHandlers | undefined;
}

export type { AngleDialProps, AngleFieldProps, DialDragParams, DialHandlers, DialPoint, DialRect };
