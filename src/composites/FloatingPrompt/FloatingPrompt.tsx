/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { Overlay } from '../../primitives/Overlay';
import { Span } from '../../primitives/text-elements';
import { WINDOW_SCOPE_CLASS } from './FloatingPrompt.constants';
import type { FloatingPromptProps } from './FloatingPrompt.type';
import { useFloatingPrompt } from './behavior/useFloatingPrompt';
import { ToastSurface } from '../Toast/sub-components/ToastSurface';
import './FloatingPrompt.css';

const FloatingPrompt = (props: FloatingPromptProps) => {
  const { open, message, actions, variant = 'info', scope = 'container', label, className } = props;
  const messageId = useId();
  const focus = useFloatingPrompt(open, scope, actions);
  if (!open) return null;

  const layerClass = ['floating-prompt', scope === 'window' && WINDOW_SCOPE_CLASS, className].filter(Boolean).join(' ');

  return (
    <Overlay ref={focus.layerRef} visible tone="clear" className={layerClass}>
      <ToastSurface
        ref={focus.ref}
        variant={variant}
        className="floating-prompt__bar"
        role="alertdialog"
        aria-modal="false"
        aria-label={label}
        aria-labelledby={label === undefined ? messageId : undefined}
        tabIndex={-1}
        onKeyDown={focus.onKeyDown}
      >
        <Span id={messageId} className="toast__message">{message}</Span>
        <Box className="floating-prompt__actions">
          {actions.map((action) => (
            <Button
              key={action.id}
              size="sm"
              variant={action.variant ?? (action.cancel === true ? 'ghost' : variant)}
              disabled={action.disabled}
              onClick={action.onSelect}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      </ToastSurface>
    </Overlay>
  );
};

export { FloatingPrompt };
