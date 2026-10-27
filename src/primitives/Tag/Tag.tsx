/* @layer renderer-components @kind component */
import { tagClass } from './behavior/tag-class';
import { tagPaint } from './behavior/tag-paint';
import { TagAnchor } from './sub-components/TagAnchor';
import { TagBody } from './sub-components/TagBody';
import { TagChip } from './sub-components/TagChip';
import { TagToggle } from './sub-components/TagToggle';
import type { TagProps } from './Tag.type';
import './Tag.css';

const Tag = (props: TagProps) => {
  const {
    variant, color, pill, icon, selected, onSelect, role, onRemove, name, disabled = false, title, className, children,
    href, navigate, onClick, target, rel, ...data
  } = props;
  const frame = {
    cls: tagClass(props),
    paint: tagPaint(props),
    title,
    disabled,
    data,
    body: <TagBody variant={variant} icon={icon}>{children}</TagBody>,
  };

  if (onSelect !== undefined) return <TagToggle {...frame} role={role} selected={selected} onSelect={onSelect} />;
  if (href !== undefined) return <TagAnchor {...frame} href={href} navigate={navigate} onClick={onClick} target={target} rel={rel} />;
  return <TagChip {...frame} label={name ?? String(children)} onRemove={onRemove} />;
};

export { Tag };
