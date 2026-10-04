/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { barItemProps } from '../behavior/bar-item-props';
import { CONTROL_CLASS, FULLSCREEN_ITEM } from '../WindowTitleBar.constants';
import { CaptionGlyph } from './CaptionGlyph';
import { TitleBarTip } from './TitleBarTip';
import type { WindowControlsProps } from './WindowControls.type';

const WindowControls = (props: WindowControlsProps) => {
  const { controls, maximized, fullscreen, fullscreenAway, onControl } = props;
  const { common, windows } = useTesseraStrings();
  const fullLabel = fullscreen ? windows.exitFullscreen : windows.fullscreen;
  const maxLabel = maximized ? windows.restore : windows.maximize;

  return (
    <Box className="window-title-bar__controls">
      {controls.fullscreen !== false && (
        <TitleBarTip label={fullLabel} away={fullscreenAway}>
          <IconButton {...barItemProps(FULLSCREEN_ITEM, fullscreenAway, CONTROL_CLASS)} label={fullLabel} onClick={() => onControl('fullscreen')}>
            <Icon name={fullscreen ? 'minimize-2' : 'maximize-2'} size={12} />
          </IconButton>
        </TitleBarTip>
      )}
      {controls.minimize !== false && (
        <TitleBarTip label={windows.minimize}>
          <IconButton className={CONTROL_CLASS} label={windows.minimize} onClick={() => onControl('minimize')}>
            <CaptionGlyph name="windowMinimize" />
          </IconButton>
        </TitleBarTip>
      )}
      {controls.maximize !== false && (
        <TitleBarTip label={maxLabel}>
          <IconButton className={CONTROL_CLASS} label={maxLabel} onClick={() => onControl('maximize')}>
            <CaptionGlyph name={maximized ? 'windowRestore' : 'windowMaximize'} />
          </IconButton>
        </TitleBarTip>
      )}
      <TitleBarTip label={common.close}>
        <IconButton className={`${CONTROL_CLASS} ${CONTROL_CLASS}--close`} label={common.close} onClick={() => onControl('close')}>
          <CaptionGlyph name="windowClose" />
        </IconButton>
      </TitleBarTip>
    </Box>
  );
};

export { WindowControls };
