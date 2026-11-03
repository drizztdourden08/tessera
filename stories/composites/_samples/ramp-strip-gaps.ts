/* @layer stories @kind logic */
import type { DragEvent } from 'react';
import type { MenuNode, RampStep } from '../../../src/composites';
import { BLUES } from './ramp-steps';

type NoteSetter = (note: string) => void;

const MARKED: readonly RampStep[] = BLUES.map((step, index) => (index % 3 === 0 ? { ...step, marks: { 'top-end': '*' } } : step));

const dragStart = (setNote: NoteSetter) => (index: number, event: DragEvent<HTMLElement>): void => {
  event.dataTransfer.setData('text/plain', String(index + 1));
  setNote(`Dragging step ${index + 1}`);
};

const stepMenu = (setNote: NoteSetter) => (index: number): readonly MenuNode[] => [
  { id: 'use', label: `Use step ${index + 1}`, onSelect: () => setNote(`Used step ${index + 1}`) },
];

export { dragStart, MARKED, stepMenu };
