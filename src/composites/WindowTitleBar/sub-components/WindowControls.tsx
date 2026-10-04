/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { barItemProps } from '../behavior/bar-item-props';
import { FULLSCREEN_ITEM } from '../WindowTitleBar.constants';
import { CaptionGlyph } from './CaptionGlyph';
import type { WindowControlsProps } from './WindowControls.type';

const WindowControls = (props: WindowControlsProps) => {
  const { controls, maximized, fullscreen, fullscreenAway, onControl } = props;
  const { common, windows } = useTesseraStrings();

  return (
    <Box className="window-title-bar__controls">
      {controls.fullscreen !== false && (
        <IconButton
          {...barItemProps(FULLSCREEN_ITEM, fullscreenAway, 'window-title-bar__control')}
          label={fullscreen ? windows.exitFullscreen : windows.fullscreen}
          onClick={() => onControl('fullscreen')}
        >
          <Icon name={fullscreen ? 'minimize-2' : 'maximize-2'} size={12} />
        </IconButton>
      )}
      {controls.minimize !== false && (
        <IconButton className="window-title-bar__control" label={windows.minimize} onClick={() => onControl('minimize')}>
          <CaptionGlyph name="windowMinimize" />
        </IconButton>
      )}
      {controls.maximize !== false && (
        <IconButton className="window-title-bar__control" label={maximized ? windows.restore : windows.maximize} onClick={() => onControl('maximize')}>
          <CaptionGlyph name={maximized ? 'windowRestore' : 'windowMaximize'} />
        </IconButton>
      )}
      <IconButton className="window-title-bar__control window-title-bar__control--close" label={common.close} onClick={() => onControl('close')}>
        <CaptionGlyph name="windowClose" />
      </IconButton>
    </Box>
  );
};

export { WindowControls };
