/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Paragraph } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Dialog } from '../Dialog';
import { ReferencedBy } from '../RecordEditor';
import type { DeleteGuardDialogProps } from './DeleteGuardDialog.type';
import './DeleteGuardDialog.css';

const DeleteGuardDialog = (props: DeleteGuardDialogProps) => {
  const { open, subjectLabel, hits, error, onConfirm, onCancel, id, data } = props;
  const { records } = useTesseraStrings();
  return (
    <Dialog
      open={open}
      title={records.deleteGuardTitle}
      message={records.deleteGuardMessage(subjectLabel)}
      confirmLabel={records.deleteGuardConfirm}
      variant="danger"
      onConfirm={onConfirm}
      onCancel={onCancel}
      id={id}
      data={data}
    >
      <Box className="delete-guard-dialog__hits">
        {error != null
          ? <Paragraph className="delete-guard-dialog__error">{error}</Paragraph>
          : <ReferencedBy hits={hits} />}
      </Box>
    </Dialog>
  );
};

export { DeleteGuardDialog };
