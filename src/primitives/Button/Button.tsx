/* @layer renderer-components @kind component */
import { forwardRef } from 'react';
import '../../theme/button-surface.css';
import '../../theme/button-pixel.css';
import '../../theme/button-solid.css';
import '../../theme/button-gradient.css';
import { DENSITY_SIZE } from '../field-control/density.constants';
import { useDensity } from '../field-control/useDensity';
import { useHintTarget } from '../hint/useHintTarget';
import './Button.css';
import type { ButtonProps } from './Button.type';
import { buttonClass } from './behavior/button-class';
import { plainLabel } from './behavior/plain-label';
import { ButtonContent } from './sub-components/ButtonContent';
import { ButtonLink } from './sub-components/ButtonLink';

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const density = useDensity();
  const {
    variant = 'tertiary', size = DENSITY_SIZE[density], look, fill, width, fullWidth = false, active = false, loading = false, disabled,
    icon, iconEnd, caption, href, target, rel, download, hint, onHint, children, className, ...rest
  } = props;
  const hintHandlers = useHintTarget({ hint, onHint, handlers: rest });
  const attributes = { ...rest, ...hintHandlers };
  const cls = buttonClass({ variant, size, look, fill, width, fullWidth, active, loading, oneLine: plainLabel(children), link: href !== undefined, className });
  const content = <ButtonContent icon={icon} iconEnd={iconEnd} loading={loading} caption={caption}>{children}</ButtonContent>;

  if (href !== undefined) {
    return (
      <ButtonLink href={href} target={target} rel={rel} download={download} disabled={disabled} loading={loading} linkRef={ref} attributes={attributes} className={cls}>
        {content}
      </ButtonLink>
    );
  }
  return (
    <button
      ref={ref}
      className={cls}
      aria-pressed={active || undefined}
      aria-busy={loading || undefined}
      disabled={loading || disabled}
      {...attributes}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export {
  Button,
};
