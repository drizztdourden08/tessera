/* @layer renderer-components @kind component */
import type { ButtonContentProps } from './ButtonContent.type';
import { ButtonIcon } from './ButtonIcon';

const ButtonContent = (props: ButtonContentProps) => {
  const { icon, iconEnd, loading, caption, children } = props;
  const hasCaption = caption !== undefined && caption !== null && caption !== false;
  return (
    <>
      <ButtonIcon icon={icon} loading={loading} />
      {hasCaption ? (
        <span className="btn__stack">
          <span className="btn__label">{children}</span>
          {' '}
          <span className="btn__caption">{caption}</span>
        </span>
      ) : (
        <span className="btn__label">{children}</span>
      )}
      <ButtonIcon icon={iconEnd} loading={false} end />
    </>
  );
};

export { ButtonContent };
