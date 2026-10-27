/* @layer renderer-components @kind component */
import { HIT_AREA_CLASS } from '../../dom/hit-area.constants';
import { Link } from '../../Link';
import type { TagAnchorProps } from './TagParts.type';

const TagAnchor = (props: TagAnchorProps) => {
  const { cls, paint, href, navigate, onClick, target, rel, disabled, title, data, body } = props;
  return (
    <Link
      href={disabled ? undefined : href}
      navigate={navigate}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-disabled={disabled || undefined}
      className={`${cls} ${HIT_AREA_CLASS}`}
      style={paint}
      title={title}
      {...data}
    >
      {body}
    </Link>
  );
};

export { TagAnchor };
