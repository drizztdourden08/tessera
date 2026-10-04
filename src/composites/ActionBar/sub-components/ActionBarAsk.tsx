/* @layer renderer-components @kind component */
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../primitives/text-elements';
import { ConfirmIconButtonAsk } from '../../ConfirmIconButton/sub-components/ConfirmIconButtonAsk';
import type { ActionBarAskProps } from '../ActionBar.type';

const ActionBarAsk = (props: ActionBarAskProps) => {
  const { action, confirm, onConfirm, onCancel } = props;
  const { common } = useTesseraStrings();
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    onCancel();
  };
  return (
    <Box className="action-bar__ask" role="group" aria-label={action.label} onKeyDown={onKeyDown}>
      <Small tone={action.kind === 'danger' ? 'danger' : 'dim'}>{confirm.title}</Small>
      <ConfirmIconButtonAsk placement="end" focusCancel confirmLabel={confirm.confirmLabel} cancelLabel={common.cancel} onConfirm={onConfirm} onCancel={onCancel} />
    </Box>
  );
};

export { ActionBarAsk };
