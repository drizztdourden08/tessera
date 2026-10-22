/* @layer renderer-components @kind logic */
import { CONTROLLER_SLOT_IDS } from '../ControllerLayout.constants';
import { amountOf, clampAxis, isActive, stickMoved } from './slot-state';
import { stickClick } from './stick-click';
import type { TesseraStrings } from '../../../primitives/strings';
import type { ControllerExtra, ControllerGeometry, ControllerRow, ControllerSlotId, ControllerSlots } from '../ControllerLayout.type';

type ControllerStrings = TesseraStrings['controller'];

const ANALOG_IDS: ReadonlySet<string> = new Set(['trigger.left', 'trigger.right', 'shoulder.left', 'shoulder.right']);

const STICK_IDS: ReadonlySet<string> = new Set(['stick.left', 'stick.right']);

const placedIds = (geometry: ControllerGeometry): ReadonlySet<ControllerSlotId> => {
  const ids = geometry.places.map((entry) => entry.id);
  const clicks = ids.map(stickClick).filter((id): id is ControllerSlotId => id !== null);
  return new Set([...ids, ...clicks]);
};

const slotName = (slots: ControllerSlots, id: ControllerSlotId, strings: ControllerStrings): string => slots[id]?.label ?? strings.names[id];

const percent = (amount: number): number => Math.round(amount * 100);

const slotRow = (slots: ControllerSlots, id: ControllerSlotId, strings: ControllerStrings): ControllerRow => {
  const state = slots[id];
  const analog = ANALOG_IDS.has(id) && state?.value !== undefined;
  return {
    id, label: slotName(slots, id, strings), glyph: state?.glyph,
    active: STICK_IDS.has(id) ? stickMoved(state) : isActive(state),
    amount: analog ? percent(amountOf(state)) : undefined,
  };
};

const extraRow = (extra: ControllerExtra): ControllerRow => ({
  id: extra.id, label: extra.label, glyph: extra.glyph, active: isActive(extra),
  amount: extra.value === undefined ? undefined : percent(amountOf(extra)),
});

const fallbackRows = (
  slots: ControllerSlots, placed: ReadonlySet<ControllerSlotId>, extras: readonly ControllerExtra[], strings: ControllerStrings,
): ControllerRow[] => [
  ...CONTROLLER_SLOT_IDS.filter((id) => slots[id] !== undefined && !placed.has(id)).map((id) => slotRow(slots, id, strings)),
  ...extras.map(extraRow),
];

const slotLine = (slots: ControllerSlots, id: ControllerSlotId, strings: ControllerStrings): string | null => {
  const state = slots[id];
  const name = slotName(slots, id, strings);
  if (STICK_IDS.has(id)) {
    if (!stickMoved(state)) return null;
    return strings.stickAt(name, clampAxis(state?.x).toFixed(2), clampAxis(state?.y).toFixed(2));
  }
  if (!isActive(state)) return null;
  return ANALOG_IDS.has(id) && state?.value !== undefined ? strings.amount(name, percent(amountOf(state))) : name;
};

const extraLine = (extra: ControllerExtra, strings: ControllerStrings): string | null => {
  if (!isActive(extra)) return null;
  return extra.value === undefined ? extra.label : strings.amount(extra.label, percent(amountOf(extra)));
};

const heldLines = (slots: ControllerSlots, extras: readonly ControllerExtra[], strings: ControllerStrings): string[] => [
  ...CONTROLLER_SLOT_IDS.map((id) => slotLine(slots, id, strings)),
  ...extras.map((extra) => extraLine(extra, strings)),
].filter((line): line is string => line !== null);

export { fallbackRows, heldLines, placedIds };
