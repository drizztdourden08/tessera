/* @layer renderer-components @kind hook */
import { useCallback, useMemo } from 'react';
import type { MouseEvent } from 'react';
import { useSelectionModel } from '../../selection';
import type { RampSelection, RampSelectionInput } from '../RampStrip.type';

const useRampSelection = (input: RampSelectionInput): RampSelection => {
  const { steps, value, selected, onChange, onSelectionChange } = input;
  const order = useMemo(() => steps.map((_, index) => String(index)), [steps]);
  const keys = useMemo(() => new Set([...(selected ?? (value === null ? [] : [value]))].map((index) => String(index))), [selected, value]);
  const isHole = useCallback((key: string) => steps[Number(key)]?.disabled === true, [steps]);
  const change = useCallback((next: ReadonlySet<string>) => onSelectionChange?.(new Set([...next].map(Number))), [onSelectionChange]);
  const pick = useCallback((key: string) => onChange(Number(key)), [onChange]);
  const model = useSelectionModel({ order, selected: keys, onChange: change, onPick: pick, isHole, seed: value === null ? null : String(value) });

  return {
    picked: (index) => keys.has(String(index)),
    press: (index: number, event: MouseEvent<HTMLElement>) => {
      if (onSelectionChange === undefined) onChange(index);
      else model.click(String(index), event);
    },
  };
};

export { useRampSelection };
