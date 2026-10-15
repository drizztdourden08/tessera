/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';
import { Overlay } from '../../primitives/Overlay';
import './DisabledOverlay.css';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { DisabledOverlayProps } from './DisabledOverlay.type';

const DisabledOverlay = (props: DisabledOverlayProps) => {
  const { panels } = useTesseraStrings();
  const {
    active, message = panels.disabled, tone = 'secondary', placement = 'center', actionLabel = panels.openSettings,
    contained = false, onOpenSettings, children, className = '',
  } = props;

  if (!active) return <>{children}</>;

  const rootClassName = ['disabled-overlay', contained && 'disabled-overlay--contained', `disabled-overlay--${tone}`, `disabled-overlay--${placement}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Box className={rootClassName}>
      <Box className="disabled-overlay__content" aria-disabled="true" inert>
        {children}
      </Box>
      <Overlay visible tone="clear" blur className="disabled-overlay__scrim">
        <Box className="disabled-overlay__notice">
          <Text className="disabled-overlay__message">{message}</Text>
          {onOpenSettings && (
            <Button variant={tone} size="sm" onClick={onOpenSettings}>{actionLabel}</Button>
          )}
        </Box>
      </Overlay>
    </Box>
  );
};

export { DisabledOverlay };
