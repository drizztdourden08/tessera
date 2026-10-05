/* @layer renderer-components @kind component */
import { HIT_AREA_CLASS } from '../dom/hit-area.constants';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Pressable } from '../Pressable';
import { Span } from '../text-elements';
import { useTesseraStrings } from '../TesseraProvider/behavior/useTesseraStrings';
import { tagClass } from './behavior/tag-class';
import type { TagProps } from './Tag.type';
import './Tag.css';

const Tag = (props: TagProps) => {
  const {
    variant, color, selected, onSelect, role, onRemove, name, disabled = false, title, className, children, ...data
  } = props;
  const cls = tagClass(props);
  const { common } = useTesseraStrings();
  const body = (
    <>
      {variant === 'category' && <span className="tag__dot" aria-hidden />}
      <Span className="tag__text">{children}</Span>
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
          className={`tag__remove ${HIT_AREA_CLASS}`}
          variant="ghost"
          size="sm"
          label={common.removeNamed(name ?? String(children))}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={onRemove}
        >
          <Icon name="x" />
        </IconButton>
      )}
    </span>
  );
};

export { Tag };
