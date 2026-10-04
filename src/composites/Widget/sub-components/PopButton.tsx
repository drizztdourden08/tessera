/* @layer renderer-components @kind component */
import { HIT_AREA_CLASS } from '../../../primitives/dom/hit-area.constants';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PopButtonProps } from './PopButton.type';

const PopButton = (props: PopButtonProps) => {
  const { out, canPopOut, onPopOut, name } = props;
  const { widgets } = useTesseraStrings();
  if (!onPopOut || (!out && !canPopOut)) return null;
  const label = out ? widgets.popInNamed(name) : widgets.popOutNamed(name);
  return (
    <IconButton className={`widget__btn ${HIT_AREA_CLASS}`} label={label} title={label} onClick={onPopOut}>
      <Icon name={out ? 'minimize-2' : 'maximize-2'} size={12} />
    </IconButton>
  );
};

export { PopButton };
