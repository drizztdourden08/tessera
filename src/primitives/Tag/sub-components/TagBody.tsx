/* @layer renderer-components @kind component */
import { Icon } from '../../Icon';
import { Span } from '../../text-elements';
import type { TagBodyProps } from './TagParts.type';

const TagBody = ({ variant, icon, children }: TagBodyProps) => (
  <>
    {variant === 'category' && <span className="tag__dot" aria-hidden />}
    {icon !== undefined && <Icon name={icon} size={12} aria-hidden />}
    <Span className="tag__text">{children}</Span>
  </>
);

export { TagBody };
