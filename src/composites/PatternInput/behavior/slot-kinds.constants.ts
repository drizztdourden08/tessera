/* @layer renderer-components @kind data */
import { decimalKind } from './decimal-kind';
import { hexKind } from './hex-kind';
import { numberKind } from './number-kind';
import { textKind } from './text-kind';
import type { SlotKind, TypedSlotType } from './slot-kind.type';

const SLOT_KINDS: Readonly<Record<TypedSlotType, SlotKind>> = {
  number: numberKind,
  hour: numberKind,
  minute: numberKind,
  decimal: decimalKind,
  text: textKind,
  hex: hexKind,
};

export { SLOT_KINDS };
