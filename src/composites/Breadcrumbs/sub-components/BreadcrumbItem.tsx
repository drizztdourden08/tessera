/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { siblingMenu } from '../behavior/sibling-menu';
import { SEPARATOR_SIZE } from '../Breadcrumbs.constants';
import type { BreadcrumbItemProps } from '../Breadcrumbs.type';
import { BreadcrumbSegmentButton } from './BreadcrumbSegmentButton';
import { BreadcrumbSiblings } from './BreadcrumbSiblings';

const BreadcrumbItem = ({ segment, current, first, drop, onNavigate }: BreadcrumbItemProps) => {
  const { label } = segment;
  const { menu, asMenu } = siblingMenu(segment);

  return (
    <Box as="li" className="breadcrumbs__item" data-current={current || undefined}>
      {!first && <Icon name="chevron-right" size={SEPARATOR_SIZE} className="breadcrumbs__separator" aria-hidden />}
      {asMenu ? (
        <BreadcrumbSiblings label={label} siblings={menu} named />
      ) : (
        <BreadcrumbSegmentButton segment={segment} current={current} drop={drop} onNavigate={onNavigate} />
      )}
      {menu !== undefined && !asMenu && <BreadcrumbSiblings label={label} siblings={menu} named={false} />}
    </Box>
  );
};

export { BreadcrumbItem };
