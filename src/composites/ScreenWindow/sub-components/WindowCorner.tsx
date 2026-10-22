/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Shortcut } from '../../../primitives/Shortcut';
import { Span } from '../../../primitives/text-elements';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { EdgeButton } from '../../edge-button/EdgeButton';
import { LockGlyph } from './LockGlyph';
import { WindowCornerTitle } from './WindowCornerTitle';
import type { WindowCornerProps } from './WindowCorner.type';
import './WindowCorner.css';

const WindowCorner = ({ lock, onClose, title }: WindowCornerProps) => {
  const { common, windows } = useTesseraStrings();
  const closeTip = <Span className="screen-window__tip">{common.close}<Shortcut keys="esc" size="xs" /></Span>;
  return (
    <>
      {title && <WindowCornerTitle {...title} />}
      {lock.shown && (
        <Tooltip content={lock.locked ? windows.unlockPosition : windows.lockPosition} placement="bottom">
          <EdgeButton label={windows.lockPosition} aria-pressed={lock.locked} className="screen-window__lock" onClick={lock.toggle}>
            <LockGlyph locked={lock.locked} size={14} />
          </EdgeButton>
        </Tooltip>
      )}
      <Tooltip content={closeTip} placement="bottom">
        <EdgeButton label={common.close} className="screen-window__corner-close" onClick={onClose}>
          <Icon name="x" size={14} />
        </EdgeButton>
      </Tooltip>
    </>
  );
};

export { WindowCorner };
