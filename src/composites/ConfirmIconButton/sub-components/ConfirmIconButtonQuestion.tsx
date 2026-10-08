/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../primitives/text-elements';
import { ConfirmIconButtonAsk } from './ConfirmIconButtonAsk';
import type { ConfirmIconButtonQuestionProps } from './ConfirmIconButtonQuestion.type';

const ConfirmIconButtonQuestion = (props: ConfirmIconButtonQuestionProps) => {
  const { className, label, question, danger, confirmLabel, ask } = props;
  const { common } = useTesseraStrings();
  return (
    <Box ref={ask.holdRef} className={className} role="group" aria-label={label} onKeyDown={ask.onKeyDown}>
      <Small tone={danger ? 'danger' : 'dim'}>{question}</Small>
      <ConfirmIconButtonAsk
        placement="end"
        focusCancel
        confirmLabel={confirmLabel}
        cancelLabel={common.cancel}
        onConfirm={ask.confirm}
        onCancel={ask.cancel}
      />
    </Box>
  );
};

export { ConfirmIconButtonQuestion };
