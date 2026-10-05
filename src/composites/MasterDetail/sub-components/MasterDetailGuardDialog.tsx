/* @layer renderer-components @kind component */
import { Paragraph } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DialogShell } from '../../DialogShell';
import type { MasterDetailGuardProps } from '../MasterDetail.type';
import { MasterDetailGuardActions } from './MasterDetailGuardActions';

const MasterDetailGuardDialog = (props: MasterDetailGuardProps) => {
  const { open, message, onStay, stayRef, saving } = props;
  const { lists } = useTesseraStrings();
  return (
    <DialogShell
      open={open}
      onClose={onStay}
      dismissable={!saving}
      title={lists.unsavedTitle}
      actions={<MasterDetailGuardActions {...props} />}
      initialFocusRef={stayRef}
    >
      <Paragraph tone="dim">{message}</Paragraph>
    </DialogShell>
  );
};

export { MasterDetailGuardDialog };
