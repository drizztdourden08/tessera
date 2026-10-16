/* @layer renderer-components @kind component */
import { IconFitContext } from '../../Icon/behavior/icon-fit-context';
import { Spinner } from '../../Spinner';
import type { ButtonIconProps } from './ButtonIcon.type';

const ButtonIcon = (props: ButtonIconProps) => {
  const { icon, loading, end = false } = props;
  if (!loading) {
    if (!icon) return null;
    return <span className={end ? 'btn__icon btn__icon--end' : 'btn__icon'}><IconFitContext value>{icon}</IconFitContext></span>;
  }
  const spinner = <span className="btn__spinner" aria-hidden="true"><Spinner size="sm" /></span>;
  if (!icon) return spinner;
  return (
    <span className="btn__icon">
      <span className="btn__glyph"><IconFitContext value>{icon}</IconFitContext></span>
      {spinner}
    </span>
  );
};

export { ButtonIcon };
