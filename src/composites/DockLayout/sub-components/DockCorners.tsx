/* @layer renderer-components @kind component */
import { useMemo, useState } from 'react';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import { cornerEnds } from '../behavior/corner-ends';
import type { CornerHandle, CornerTurn } from '../behavior/corner.type';
import { editOfTurn } from '../behavior/edit-of-turn';
import { DockCornerHandle } from './DockCornerHandle';
import type { DockCornersProps } from './DockCorners.type';
import '../../../theme/visually-hidden.css';

const DockCorners = (props: DockCornersProps) => {
  const { laid, tree, labelOf, onEdit, hidden } = props;
  const { widgets } = useTesseraStrings();
  const [message, setMessage] = useState('');
  const handles = useMemo(() => cornerEnds(laid, tree), [laid, tree]);
  const nameOf = (handle: CornerHandle, turn: CornerTurn | null) =>
    widgets.cornerNames[(turn === 'give' ? handle.giveCorner : handle.takeCorner) ?? handle.giveCorner ?? 'top-left'];

  const turn = (handle: CornerHandle, how: CornerTurn) => {
    onEdit(editOfTurn(handle, how));
    const say = how === 'take' ? widgets.cornerTaken : widgets.cornerGiven;
    setMessage(say(labelOf(handle.active), nameOf(handle, how)));
  };

  if (hidden) return null;
  return (
    <>
      {handles.map((handle) => (
        <DockCornerHandle
          key={`${handle.key}-${handle.along}-${handle.end}`}
          handle={handle}
          label={widgets.cornerLabel(labelOf(handle.active), nameOf(handle, handle.take === null ? 'give' : 'take'))}
          hint={widgets.cornerHint}
          onTurn={turn}
        />
      ))}
      <Span className="visually-hidden" role="status" aria-live="polite">{message}</Span>
    </>
  );
};

export { DockCorners };
