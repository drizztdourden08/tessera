/* @layer renderer-components @kind component */
import { Paragraph } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DialogShell } from '../../DialogShell';
import type { ListDetailGuardProps } from '../ListDetail.type';
import { ListDetailGuardActions } from './ListDetailGuardActions';

const ListDetailGuardDialog = (props: ListDetailGuardProps) => {
  const { open, message, onStay, stayRef, saving } = props;
  const { common } = useTesseraStrings();
  return (
    <DialogShell
      open={open}
      onClose={onStay}
      dismissable={!saving}
      title={common.unsavedTitle}
      actions={<ListDetailGuardActions {...props} />}
      initialFocusRef={stayRef}
    >
      <Paragraph tone="dim">{message}</Paragraph>
    </DialogShell>
  );
};

export { ListDetailGuardDialog };
