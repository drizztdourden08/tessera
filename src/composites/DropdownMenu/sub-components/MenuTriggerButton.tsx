/* @layer renderer-components @kind component */
import { Button } from '../../../primitives/Button';
import { IconButton } from '../../../primitives/IconButton';
import { Span } from '../../../primitives/text-elements';
import { MenuTriggerGlyph } from './MenuTriggerGlyph';
import type { MenuTriggerButtonProps } from './MenuTriggerButton.type';

const MenuTriggerButton = (props: MenuTriggerButtonProps) => {
  const { buttonRef, trigger, variant, size, open, ...rest } = props;
  const { label, icon = trigger.iconOnly ? 'hamburger' : undefined, iconSide = 'start', iconOnly = false } = trigger;
  const glyph = icon === undefined ? null : <MenuTriggerGlyph icon={icon} open={open} />;
  const anchor = { ref: buttonRef };

  if (iconOnly) {
    return <IconButton {...anchor} {...rest} variant={variant} size={size} label={label}>{glyph}</IconButton>;
  }
  return (
    <Button ref={buttonRef} {...rest} variant={variant} size={size} icon={iconSide === 'start' ? glyph : undefined}>
      {label}
      {iconSide === 'end' && glyph && <Span className="btn__icon dropdown-trigger__end">{glyph}</Span>}
    </Button>
  );
};

export { MenuTriggerButton };
