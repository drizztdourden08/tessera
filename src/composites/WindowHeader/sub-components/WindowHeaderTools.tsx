/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { WindowHeaderToolsProps } from '../WindowHeader.type';
import { WindowHeaderActions } from './WindowHeaderActions';

const WindowHeaderTools = ({ extra, extraFits, actions, onClose }: WindowHeaderToolsProps) => {
  const { common } = useTesseraStrings();
  return (
    <>
      {extra != null && (
        <Box className={`window-header__extra${extraFits ? '' : ' window-header__extra--away'}`} aria-hidden={extraFits ? undefined : true}>{extra}</Box>
      )}
      {actions != null && <WindowHeaderActions>{actions}</WindowHeaderActions>}
      {onClose && (
        <IconButton variant="ghost" size="md" label={common.close} className="window-header__close" onClick={onClose}><Icon name="x" size={20} /></IconButton>
      )}
    </>
  );
};

export { WindowHeaderTools };
