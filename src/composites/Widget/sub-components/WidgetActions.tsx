/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { APP_REGION_ATTRIBUTE } from '../../../primitives/dom/app-region.constants';
import { Icon } from '../../../primitives/Icon';
import { HIT_AREA_CLASS } from '../../../primitives/dom/hit-area.constants';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { PinMenu } from './PinMenu';
import { PopButton } from './PopButton';
import type { WidgetActionsProps } from './WidgetActions.type';

const WidgetActions = (props: WidgetActionsProps) => {
  const { mode, pin, onPinChange, titleBarActions, onPopOut, canPopOut, options, onClose, name, dragRegion = false } = props;
  const { widgets } = useTesseraStrings();
  const close = widgets.closeNamed(name);
  const out = mode === 'out';

  return (
    <Box className="widget__titlebar-actions" {...{ [APP_REGION_ATTRIBUTE]: dragRegion ? 'no-drag' : undefined }}>
      {titleBarActions}
      {out && onPinChange && <PinMenu pin={pin ?? 'off'} onChange={onPinChange} />}
      <PopButton out={out} canPopOut={canPopOut ?? true} onPopOut={onPopOut} name={name} />
      {options}
      <IconButton size="xs" className={`widget__btn ${HIT_AREA_CLASS}`} label={close} title={close} onClick={onClose}>
        <Icon name="x" size={14} />
      </IconButton>
    </Box>
  );
};

export { WidgetActions };
