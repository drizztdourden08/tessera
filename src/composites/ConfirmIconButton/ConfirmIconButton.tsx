/* @layer renderer-components @kind component */
import { useCallback, useEffect, useState, type KeyboardEvent } from 'react';
import { Box } from '../../primitives/Box';
import { PathIcon } from '../../primitives/PathIcon';
import { IconButton } from '../../primitives/IconButton';
import './ConfirmIconButton.css';
import { CANCEL_PATH, CONFIRM_PATH } from './ConfirmIconButton.constants';
import { type ConfirmIconButtonProps } from './ConfirmIconButton.type';

const strokeIcon = (path: string) => (
  <PathIcon
    size={13}
    paths={[path]}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

const ConfirmIconButton = (props: ConfirmIconButtonProps) => {
  const { icon, label, confirmLabel, cancelLabel, onConfirm, disabled = false, defaultArmed = false, className = '' } = props;
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

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    setArmed(false);
  }, []);

  return (
    <Box className={`confirm-icon-btn ${className}`} onKeyDown={handleKeyDown}>
      {!armed && (
        <IconButton label={label} title={label} disabled={disabled} onClick={handleArm}>
          {icon}
        </IconButton>
      )}
      {armed && (
        <>
          <IconButton
            autoFocus={asked}
            variant="danger"
            label={cancelLabel}
            title={cancelLabel}
            onClick={() => setArmed(false)}
          >
            {strokeIcon(CANCEL_PATH)}
          </IconButton>
          <IconButton variant="secondary" label={confirmLabel} title={confirmLabel} onClick={handleConfirm}>
            {strokeIcon(CONFIRM_PATH)}
          </IconButton>
        </>
      )}
    </Box>
  );
};

export {
  ConfirmIconButton,
};
