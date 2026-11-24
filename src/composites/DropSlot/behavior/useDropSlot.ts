/* @layer renderer-components @kind logic */
import { useState } from 'react';
import type { DragEvent, KeyboardEvent } from 'react';
import { PICK_KEYS } from '../DropSlot.constants';
import type { DropSlotProps } from '../DropSlot.type';
import { carriesAccepted } from './drop-slot-payload';
import { payloadOf } from './payload-of';
import type { DropSlotBind } from './useDropSlot.type';

const useDropSlot = (props: Pick<DropSlotProps, 'accept' | 'disabled' | 'onDrop' | 'onPick'>): DropSlotBind => {
  const { accept, disabled, onDrop, onPick } = props;
  const [over, setOver] = useState(false);
  const takes = (event: DragEvent<HTMLElement>) => !disabled && carriesAccepted(Array.from(event.dataTransfer.types), accept);
  const enter = (event: DragEvent<HTMLElement>) => {
    if (!takes(event)) return;
    event.preventDefault();
    setOver(true);
  };
  const leave = (event: DragEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOver(false);
  };
  const drop = (event: DragEvent<HTMLElement>) => {
    if (!takes(event)) return;
    event.preventDefault();
    setOver(false);
    onDrop?.(payloadOf(event.dataTransfer, accept), event);
  };
  const key = (event: KeyboardEvent<HTMLElement>) => {
    if (disabled || event.target !== event.currentTarget || !PICK_KEYS.includes(event.key)) return;
    event.preventDefault();
    onPick?.();
  };
  return { over, onDragEnter: enter, onDragOver: enter, onDragLeave: leave, onDrop: drop, onKeyDown: key };
};

export { useDropSlot };
