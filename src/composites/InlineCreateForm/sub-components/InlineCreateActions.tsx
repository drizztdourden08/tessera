/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { ButtonRow } from '../../../primitives/ButtonRow';
import { CANCEL_LABEL, SUBMIT_LABEL } from '../InlineCreateForm.constants';
import type { InlineCreateActionsProps } from './InlineCreateActions.type';

const InlineCreateActions = (props: InlineCreateActionsProps) => {
  const { ready, onSubmit, onCancel, submitLabel = SUBMIT_LABEL, cancelLabel = CANCEL_LABEL } = props;
  return (
    <ButtonRow className="inline-create-form__actions">
      <Button variant="primary" fullWidth disabled={!ready} onClick={onSubmit}>{submitLabel}</Button>
      {onCancel && <Button variant="tertiary" fullWidth onClick={onCancel}>{cancelLabel}</Button>}
    </ButtonRow>
  );
};

export { InlineCreateActions };
