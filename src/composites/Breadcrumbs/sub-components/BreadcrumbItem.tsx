/* @layer renderer-components @kind component */
import '../../../theme/focus-ring.css';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Pressable } from '../../../primitives/Pressable';
import { Span } from '../../../primitives/text-elements';
import { SEGMENT_ICON_SIZE, SEPARATOR_SIZE } from '../Breadcrumbs.constants';
import type { BreadcrumbItemProps } from '../Breadcrumbs.type';
import { BreadcrumbSiblings } from './BreadcrumbSiblings';

const BreadcrumbItem = ({ segment, current, first, drop, onNavigate }: BreadcrumbItemProps) => {
  const { id, label, icon, siblings, opensMenu } = segment;
  const menu = siblings !== undefined && siblings.length > 0 ? siblings : undefined;
  const asMenu = menu !== undefined && opensMenu === true;

  return (
    <Box as="li" className="breadcrumbs__item" data-current={current || undefined}>
      {!first && <Icon name="chevron-right" size={SEPARATOR_SIZE} className="breadcrumbs__separator" aria-hidden />}
      {asMenu ? (
        <BreadcrumbSiblings label={label} siblings={menu} named />
      ) : (
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
      )}
      {menu !== undefined && !asMenu && <BreadcrumbSiblings label={label} siblings={menu} named={false} />}
    </Box>
  );
};

export { BreadcrumbItem };
