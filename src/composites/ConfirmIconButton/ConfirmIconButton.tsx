/* @layer renderer-components @kind component */
import { useState } from 'react';
import { Box } from '../../primitives/Box';
import { IconButton } from '../../primitives/IconButton';
import './ConfirmIconButton.css';
import { type ConfirmIconButtonProps } from './ConfirmIconButton.type';
import { useConfirmAsk } from './behavior/useConfirmAsk';
import { ConfirmIconButtonAsk } from './sub-components/ConfirmIconButtonAsk';

const ConfirmIconButton = (props: ConfirmIconButtonProps) => {
  const {
    icon, label, confirmLabel, cancelLabel, onConfirm, disabled = false, defaultArmed = false, placement = 'start', tabIndex, className = '',
  } = props;
  const ask = useConfirmAsk<true>({ onConfirm, disabled, initial: defaultArmed ? true : null });
  const [asked, setAsked] = useState(false);

  const handleArm = (): void => {
    setAsked(true);
    ask.ask(true);
  };

  return (
    <Box className={`confirm-icon-btn confirm-icon-btn--${placement} ${className}`} onKeyDown={ask.onKeyDown}>
      {ask.asking === null && (
        <IconButton label={label} title={label} disabled={disabled} tabIndex={tabIndex} onClick={handleArm}>
          {icon}
        </IconButton>
      )}
      {ask.asking !== null && (
        <ConfirmIconButtonAsk
          placement={placement}
          focusCancel={asked}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          onConfirm={ask.confirm}
          onCancel={ask.cancel}
        />
      )}
    </Box>
  );
};

export {
  ConfirmIconButton,
};
