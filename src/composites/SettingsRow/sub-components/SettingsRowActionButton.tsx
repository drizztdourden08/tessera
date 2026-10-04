/* @layer renderer-components @kind component */
import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Small } from '../../../primitives/text-elements';
import { ConfirmIconButtonAsk } from '../../ConfirmIconButton/sub-components/ConfirmIconButtonAsk';
import type { SettingsRowActionButtonProps } from './SettingsRowActionButton.type';

const SettingsRowActionButton = (props: SettingsRowActionButtonProps) => {
  const { action, disabled } = props;
  const { common } = useTesseraStrings();
  const [armed, setArmed] = useState(false);
  const run = () => {
    setArmed(false);
    action.onClick();
  };
  const escape = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    setArmed(false);
  };

  if (armed) {
    return (
      <Box className="settings-row__confirm" role="group" aria-label={action.label} onKeyDown={escape}>
        <Small tone={action.tone === 'danger' ? 'danger' : 'dim'}>{action.confirm}</Small>
        <ConfirmIconButtonAsk placement="end" focusCancel confirmLabel={action.label} cancelLabel={common.cancel} onConfirm={run} onCancel={() => setArmed(false)} />
      </Box>
    );
  }
  return (
    <Button
      size="sm"
      variant={action.tone === 'danger' ? 'danger' : 'secondary'}
      icon={action.icon}
      disabled={disabled || action.disabled === true}
      onClick={action.confirm === undefined ? action.onClick : () => setArmed(true)}
    >
      {action.label}
    </Button>
  );
};

export { SettingsRowActionButton };
