/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { IconButton } from '../../../primitives/IconButton';
import { Tooltip, TooltipContent } from '../../../primitives/Tooltip';
import { chevronSizeOf } from '../behavior/chevron-size-of';
import type { SplitButtonMainProps } from '../SplitButton.type';

const SplitButtonMain = (props: SplitButtonMainProps) => {
  const { label, icon, iconOnly, shortcut, variant, size, pressed, disabled, onClick } = props;
  const compact = iconOnly === true && icon !== undefined;
  const shared = { variant, disabled, onClick, 'aria-pressed': pressed, className: 'split-button__main' };
  const main = compact
    ? <IconButton {...shared} size={chevronSizeOf(size)} label={label} active={pressed === true}>{icon}</IconButton>
    : <Button {...shared} size={size} icon={icon} active={pressed === true}>{label}</Button>;
  if (!compact && shortcut === undefined) return main;

  return (
    <Tooltip content={<TooltipContent name={label} shortcut={shortcut} />} placement="bottom">
      {main}
    </Tooltip>
  );
};

export { SplitButtonMain };
