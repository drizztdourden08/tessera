/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { PathIcon } from '../../../primitives/PathIcon';
import {
  CAPTION_SIZE, CAPTION_VIEWBOX, CLOSE_PATHS, MAXIMIZE_PATHS, MINIMIZE_PATHS, RESTORE_PATHS,
} from '../WindowTitleBar.constants';
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
          <PathIcon paths={MINIMIZE_PATHS} size={CAPTION_SIZE} viewBox={CAPTION_VIEWBOX} />
        </IconButton>
      )}
      {onMaximizeToggle && (
        <IconButton className="window-title-bar__control" label={maximized ? 'Restore' : 'Maximize'} onClick={onMaximizeToggle}>
          <PathIcon paths={maximized ? RESTORE_PATHS : MAXIMIZE_PATHS} size={CAPTION_SIZE} viewBox={CAPTION_VIEWBOX} />
        </IconButton>
      )}
      {onClose && (
        <IconButton className="window-title-bar__control window-title-bar__control--close" label="Close" onClick={onClose}>
          <PathIcon paths={CLOSE_PATHS} size={CAPTION_SIZE} viewBox={CAPTION_VIEWBOX} />
        </IconButton>
      )}
    </Box>
  );
};

export { WindowControls };
