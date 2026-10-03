/* @layer renderer-components @kind component */
import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';
import { Box } from '../../primitives/Box';
import { IconButton } from '../../primitives/IconButton';
import './ConfirmIconButton.css';
import { type ConfirmIconButtonProps } from './ConfirmIconButton.type';
import { ConfirmIconButtonAsk } from './sub-components/ConfirmIconButtonAsk';

const ConfirmIconButton = (props: ConfirmIconButtonProps) => {
  const {
    icon, label, confirmLabel, cancelLabel, onConfirm, disabled = false, defaultArmed = false, placement = 'start', className = '',
  } = props;
  const [armed, setArmed] = useState(defaultArmed && !disabled);
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    if (disabled) setArmed(false);
  }, [disabled]);

  const handleConfirm = useCallback(() => {
    setArmed(false);
    onConfirm();
  }, [onConfirm]);

  const handleArm = useCallback(() => {
    setAsked(true);
    setArmed(true);
  }, []);

  const handleCancel = useCallback(() => setArmed(false), []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    setArmed(false);
  }, []);

  return (
    <Box className={`confirm-icon-btn confirm-icon-btn--${placement} ${className}`} onKeyDown={handleKeyDown}>
      {!armed && (
        <IconButton label={label} title={label} disabled={disabled} onClick={handleArm}>
          {icon}
        </IconButton>
      )}
      {armed && (
        <ConfirmIconButtonAsk
          placement={placement}
          focusCancel={asked}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </Box>
  );
};

export {
  ConfirmIconButton,
};
