/* @layer renderer-components @kind component */
import { Icon } from '../Icon';
import { tagHueClass } from '../tag-hue/tag-hue-class';
import { Tooltip } from '../Tooltip';
import { TYPE_MARK_ICON_SIZE } from './TypeMark.constants';
import type { TypeMarkProps } from './TypeMark.type';
import './TypeMark.css';
import '../../theme/tag-hue.css';

const TypeMark = (props: TypeMarkProps) => {
  const { icon, label, color, size = 'xs', className } = props;
  const cls = ['type-mark', `type-mark--${size}`, tagHueClass(color), className].filter(Boolean).join(' ');
  return (
    <Tooltip content={label}>
      <span className={cls} role="img" aria-label={label}>
        <Icon name={icon} size={TYPE_MARK_ICON_SIZE[size]} aria-hidden />
      </span>
    </Tooltip>
  );
};

export { TypeMark };
