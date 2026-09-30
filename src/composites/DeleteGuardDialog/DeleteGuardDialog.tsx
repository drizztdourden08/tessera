/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Paragraph } from '../../primitives/text-elements';
import { Dialog } from '../Dialog';
import { ReferencedBy } from '../RecordEditor';
import { CONFIRM, TITLE } from './DeleteGuardDialog.constants';
import type { DeleteGuardDialogProps } from './DeleteGuardDialog.type';
import './DeleteGuardDialog.css';

const messageFor = (subjectLabel: string): string =>
  `${subjectLabel} is still referenced elsewhere. Deleting it will leave those references dangling.`;

const DeleteGuardDialog = (props: DeleteGuardDialogProps) => {
  const { open, subjectLabel, hits, error, onConfirm, onCancel } = props;
  return (
    <Dialog
      open={open}
      title={TITLE}
      message={messageFor(subjectLabel)}
      confirmLabel={CONFIRM}
      variant="danger"
      onConfirm={onConfirm}
      onCancel={onCancel}
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
