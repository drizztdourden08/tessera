/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { tagHueClass } from '../tag-hue/tag-hue-class';
import { Tooltip } from '../Tooltip';
import { TYPE_MARK_ICON_SIZE, TYPE_MARK_OUTLINE_ICON_SIZE } from './TypeMark.constants';
import type { TypeMarkProps } from './TypeMark.type';
import './TypeMark.css';
import '../../theme/tag-hue.css';

const TypeMark = (props: TypeMarkProps) => {
  const { icon, label, color, tone, size = 'xs', variant = 'tile', className } = props;
  const hue = tone === undefined ? tagHueClass(color) : `type-mark--tone-${tone}`;
  const cls = ['type-mark', `type-mark--${size}`, `type-mark--${variant}`, hue, className].filter(Boolean).join(' ');
  const iconSize = variant === 'outline' ? TYPE_MARK_OUTLINE_ICON_SIZE[size] : TYPE_MARK_ICON_SIZE[size];
  return (
    <Tooltip content={label}>
      <span className={cls} role="img" aria-label={label}>
        <Icon name={icon} size={iconSize} aria-hidden />
      </span>
    </Tooltip>
  );
};

export { TypeMark };
