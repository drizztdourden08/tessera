/* @layer renderer-components @kind component */
import { Glyph } from '../Glyph';
import { IconButton } from '../IconButton';
import { Pressable } from '../Pressable';
import { Span } from '../text-elements';
import { tagClass } from './behavior/tag-class';
import type { TagProps } from './Tag.type';
import './Tag.css';

const Tag = (props: TagProps) => {
  const {
    variant, color, selected, onSelect, role, onRemove, name, disabled = false, title, className, children, ...data
  } = props;
  const cls = tagClass(props);
  const body = (
    <>
      {variant === 'category' && <span className="tag-chip__dot" aria-hidden />}
      <Span className="tag-chip__text">{children}</Span>
    </>
  );

  if (onSelect !== undefined) {
    const radio = role === 'radio';
    return (
      <Pressable
        className={cls}
        role={role}
        aria-pressed={radio ? undefined : selected}
        aria-checked={radio ? selected : undefined}
        disabled={disabled}
        title={title}
        onClick={onSelect}
        {...data}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <span className={cls} title={title} {...data}>
      {body}
      {onRemove !== undefined && (
        <IconButton
          className="tag-chip__remove"
          variant="ghost"
          size="sm"
          label={`Remove ${name ?? String(children)}`}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={onRemove}
        >
          <Glyph name="close" />
        </IconButton>
      )}
    </span>
  );
};

export { Tag };
