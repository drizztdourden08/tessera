/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Glyph } from '../../../primitives/Glyph';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import type { WindowControlsProps } from './WindowControls.type';

const WindowControls = (props: WindowControlsProps) => {
  const { maximized, fullscreen, onFullscreenToggle, onMinimize, onMaximizeToggle, onClose } = props;

  return (
    <Box className="window-title-bar__controls">
      {onFullscreenToggle && (
        <IconButton className="window-title-bar__control" label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} onClick={onFullscreenToggle}>
          <Icon name={fullscreen ? 'minimize-2' : 'maximize-2'} size={12} />
        </IconButton>
      )}
      {onMinimize && (
        <IconButton className="window-title-bar__control" label="Minimize" onClick={onMinimize}>
          <Glyph name="minus" size={12} />
        </IconButton>
      )}
      {onMaximizeToggle && (
        <IconButton className="window-title-bar__control" label={maximized ? 'Restore' : 'Maximize'} onClick={onMaximizeToggle}>
          <Glyph name={maximized ? 'windowRestore' : 'windowMaximize'} size={12} />
        </IconButton>
      )}
      {onClose && (
        <IconButton className="window-title-bar__control window-title-bar__control--close" label="Close" onClick={onClose}>
          <Glyph name="close" size={12} />
        </IconButton>
      )}
    </Box>
  );
};

export { WindowControls };
