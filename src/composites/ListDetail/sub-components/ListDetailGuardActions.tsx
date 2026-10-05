/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { ListDetailGuardActionsProps } from '../ListDetail.type';

const ListDetailGuardActions = (props: ListDetailGuardActionsProps) => {
  const { saveLabel, saving, onStay, onDiscard, onSave, stayRef, size = 'md' } = props;
  const { common } = useTesseraStrings();
  return (
    <>
      <Button ref={stayRef} size={size} variant={size === 'sm' ? 'ghost' : 'tertiary'} disabled={saving} onClick={onStay}>{common.keepEditing}</Button>
      <Button size={size} variant="secondary" disabled={saving} onClick={onDiscard}>{common.discard}</Button>
      {onSave && <Button size={size} variant="primary" loading={saving} onClick={onSave}>{saveLabel}</Button>}
    </>
  );
};

export { ListDetailGuardActions };
