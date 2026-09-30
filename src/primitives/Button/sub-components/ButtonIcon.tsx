/* @layer renderer-components @kind component */
import { Spinner } from '../../Spinner';
import type { ButtonIconProps } from './ButtonIcon.type';

const ButtonIcon = (props: ButtonIconProps) => {
  const { icon, loading } = props;
  if (!loading) return icon ? <span className="btn__icon">{icon}</span> : null;
  const spinner = <span className="btn__spinner" aria-hidden="true"><Spinner size="sm" /></span>;
  if (!icon) return spinner;
  return (
    <span className="btn__icon">
      <span className="btn__glyph">{icon}</span>
      {spinner}
    </span>
  );
};

export { ButtonIcon };
