/* @layer renderer-components @kind hook */
import { useCallback, useMemo, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { LayoutEdit, LayoutNode, WidgetId } from '../DockLayout.type';
import type { CornerHandle, CornerTurn } from './corner.type';
import type { CornerTurns } from './corner-turns.type';
import { cornerEnds } from './corner-ends';
import { cornerZones } from './corner-zones';
import { editOfTurn } from './edit-of-turn';
import type { LaidOut } from './layout-tree.type';

const useCornerTurns = (laid: LaidOut, tree: LayoutNode, labelOf: (id: WidgetId) => string, onEdit: (edit: LayoutEdit) => void): CornerTurns => {
  const { widgets } = useTesseraStrings();
  const [message, setMessage] = useState('');
  const handles = useMemo(() => cornerEnds(laid, tree), [laid, tree]);
  const zones = useMemo(() => cornerZones(laid, tree, handles), [laid, tree, handles]);
  const nameOf = useCallback(
    (handle: CornerHandle, turn: CornerTurn | null) =>
      widgets.cornerNames[(turn === 'give' ? handle.giveCorner : handle.takeCorner) ?? handle.giveCorner ?? 'top-left'],
    [widgets],
  );
  const labelFor = useCallback(
    (handle: CornerHandle) => widgets.cornerLabel(labelOf(handle.active), nameOf(handle, handle.take === null ? 'give' : 'take')),
    [widgets, labelOf, nameOf],
  );
  const turn = useCallback((handle: CornerHandle, how: CornerTurn) => {
    onEdit(editOfTurn(handle, how));
    const say = how === 'take' ? widgets.cornerTaken : widgets.cornerGiven;
    setMessage(say(labelOf(handle.active), nameOf(handle, how)));
  }, [onEdit, widgets, labelOf, nameOf]);
  return { handles, zones, message, hint: widgets.cornerHint, labelFor, turn };
};

export { useCornerTurns };
