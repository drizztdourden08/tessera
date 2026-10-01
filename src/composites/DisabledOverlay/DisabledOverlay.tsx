/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { Button } from '../../primitives/Button';
import './DisabledOverlay.css';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { DisabledOverlayProps } from './DisabledOverlay.type';

const DisabledOverlay = (props: DisabledOverlayProps) => {
  const { panels } = useTesseraStrings();
  const {
    active, message = panels.disabled, actionLabel = panels.openSettings,
    contained = false, onOpenSettings, children, className = '',
  } = props;

  if (!active) return <>{children}</>;

  const rootClassName = ['disabled-overlay', contained && 'disabled-overlay--contained', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Box className={rootClassName}>
      <Box className="disabled-overlay__content" aria-disabled="true" inert>
        {children}
      </Box>
      <Box className="disabled-overlay__scrim">
        <Text className="disabled-overlay__message">{message}</Text>
        {onOpenSettings && (
          <Button variant="secondary" size="sm" onClick={onOpenSettings}>{actionLabel}</Button>
        )}
      </Box>
    </Box>
  );
};

export { DisabledOverlay };
