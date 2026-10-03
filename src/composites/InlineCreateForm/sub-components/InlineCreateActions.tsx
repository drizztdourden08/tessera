/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { ButtonRow } from '../../../primitives/ButtonRow';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { InlineCreateActionsProps } from './InlineCreateActions.type';

const InlineCreateActions = (props: InlineCreateActionsProps) => {
  const { ready, size, onSubmit, onCancel, submitLabel, cancelLabel } = props;
  const { common } = useTesseraStrings();
  return (
    <ButtonRow className="inline-create-form__actions">
      <Button variant="primary" size={size} fullWidth disabled={!ready} onClick={onSubmit}>{submitLabel ?? common.create}</Button>
      {onCancel && <Button variant="tertiary" size={size} fullWidth onClick={onCancel}>{cancelLabel ?? common.cancel}</Button>}
    </ButtonRow>
  );
};

export { InlineCreateActions };
