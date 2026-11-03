/* @layer renderer-components @kind component */
import '../../../theme/focus-ring.css';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { SEGMENT_ICON_SIZE } from '../Breadcrumbs.constants';
import type { BreadcrumbSegmentButtonProps } from '../Breadcrumbs.type';

const BreadcrumbSegmentButton = ({ segment, current, drop, onNavigate }: BreadcrumbSegmentButtonProps) => {
  const { id, label, icon } = segment;

  return (
    <Pressable
      className="breadcrumbs__segment focus-ring-inset"
      aria-current={current ? 'page' : undefined}
      data-drop={drop.overId === id || undefined}
      onClick={() => onNavigate(id)}
      {...drop.bind(id)}
    >
      {icon !== undefined && <Icon name={icon} size={SEGMENT_ICON_SIZE} aria-hidden />}
      <Span className="breadcrumbs__label">{label}</Span>
    </Pressable>
  );
};

export { BreadcrumbSegmentButton };
