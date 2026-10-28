/* @layer renderer-components @kind types */
import type { FocusEvent, FocusEventHandler, KeyboardEvent, KeyboardEventHandler, PointerEvent, RefObject } from 'react';
import type { NumberInputProps } from '../../primitives/NumberInput';

interface NumberPreset {
  value: number;
  label?: string;
}

type NumberPresetInput = number | NumberPreset;

interface NumberFieldProps extends Omit<NumberInputProps, 'value' | 'onChange' | 'onStep' | 'buttons' | 'sizeToContent' | 'start' | 'end'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  fineStep?: number;
  ladder?: readonly number[];
  presets?: readonly NumberPresetInput[];
  suffix?: string;
  scrub?: boolean;
  wheel?: boolean;
}

interface StepConfig {
  step: number;
  fineStep: number;
  min?: number;
  max?: number;
  ladder?: readonly number[];
  fine: boolean;
}

interface ScrubDrag {
  x: number;
  value: number;
}

interface ScrubParams {
  value: number;
  enabled: boolean;
  config: Omit<StepConfig, 'fine'>;
  onChange: (value: number) => void;
}

interface ScrubHandlers {
  onPointerDown: (event: PointerEvent<HTMLElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLElement>) => void;
  onPointerCancel: (event: PointerEvent<HTMLElement>) => void;
}

interface NumberFieldLabelProps {
  text: string | undefined;
  scrub: ScrubHandlers | undefined;
  rootRef: RefObject<HTMLElement | null>;
}

interface NumberFieldBehaviorParams {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step: number;
  fineStep?: number;
  ladder?: readonly number[];
  scrub: boolean;
  wheel: boolean;
  locked: boolean;
  rootRef: RefObject<HTMLElement | null>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

interface NumberFieldBehavior {
  shown: number;
  apply: (value: number) => void;
  stepBy: (direction: 1 | -1, fine: boolean) => void;
  scrubbing: ScrubHandlers | undefined;
  onFocus: () => void;
  onRootBlur: () => void;
  onType: (value: number) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

interface NumberFieldTailProps {
  suffix: string | undefined;
  presets: readonly NumberPresetInput[] | undefined;
  value: number;
  locked: boolean;
  onPick: (value: number) => void;
}

interface NumberFieldPresetsProps {
  presets: readonly NumberPreset[];
  value: number;
  suffix: string | undefined;
  disabled: boolean | undefined;
  onPick: (value: number) => void;
}

export type {
  NumberFieldBehavior, NumberFieldBehaviorParams, NumberFieldLabelProps, NumberFieldPresetsProps, NumberFieldProps, NumberFieldTailProps, NumberPreset, NumberPresetInput, ScrubDrag, ScrubHandlers, ScrubParams, StepConfig,
};
