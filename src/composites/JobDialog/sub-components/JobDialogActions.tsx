/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { JobDialogActionsProps } from '../JobDialog.type';

const JobDialogActions = (props: JobDialogActionsProps) => {
  const { running, onHide, onCancel, onClose, cancelling, extra, mainRef } = props;
  const { common, panels } = useTesseraStrings();
  if (!running) {
    return (
      <>
        {extra}
        <Button ref={mainRef} variant="primary" onClick={onClose}>{common.close}</Button>
      </>
    );
  }
  return (
    <>
      {extra}
      {onCancel && <Button variant="tertiary" onClick={onCancel} loading={cancelling}>{common.cancel}</Button>}
      <Button ref={mainRef} variant="secondary" onClick={onHide}>{panels.hideJob}</Button>
    </>
  );
};

export { JobDialogActions };
