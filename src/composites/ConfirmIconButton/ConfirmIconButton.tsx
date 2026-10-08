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
    icon, label, confirmLabel, cancelLabel, onConfirm, onCancel, onAsk, disabled = false, defaultArmed = false, placement = 'start', size = 'sm',
    tabIndex, className = '',
  } = props;
  const ask = useConfirmAsk<true>({ onConfirm, onCancel, onAsk, disabled, initial: defaultArmed ? true : null });
  const [asked, setAsked] = useState(false);

  const handleArm = (): void => {
    setAsked(true);
    ask.ask(true);
  };

  return (
    <Box ref={ask.holdRef} className={`confirm-icon-btn confirm-icon-btn--${placement} confirm-icon-btn--${size} ${className}`} onKeyDown={ask.onKeyDown}>
      {ask.asking === null && (
        <IconButton ref={ask.triggerRef} label={label} title={label} size={size} disabled={disabled} tabIndex={tabIndex} onClick={handleArm}>
          {icon}
        </IconButton>
      )}
      {ask.asking !== null && (
        <ConfirmIconButtonAsk
          placement={placement}
          size={size}
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
