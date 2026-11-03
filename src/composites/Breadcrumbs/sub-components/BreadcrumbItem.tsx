/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { siblingMenu } from '../behavior/sibling-menu';
import { springHandlers } from '../behavior/spring-handlers';
import { SEPARATOR_SIZE } from '../Breadcrumbs.constants';
import type { BreadcrumbItemProps } from '../Breadcrumbs.type';
import { BreadcrumbSegmentButton } from './BreadcrumbSegmentButton';
import { BreadcrumbSiblings } from './BreadcrumbSiblings';
import { BreadcrumbSpringMenu } from './BreadcrumbSpringMenu';

const BreadcrumbItem = ({ segment, index, current, first, drop, spring, onNavigate }: BreadcrumbItemProps) => {
  const { id, label, title } = segment;
  const { menu, asMenu } = siblingMenu(segment);
  const itemRef = useRef<HTMLElement>(null);

  return (
    <Box
      as="li"
      ref={itemRef}
      className="breadcrumbs__item"
      data-current={current || undefined}
      title={asMenu ? title : undefined}
      {...springHandlers(spring, id, menu !== undefined)}
    >
      {!first && <Icon name="chevron-right" size={SEPARATOR_SIZE} className="breadcrumbs__separator" aria-hidden />}
      {asMenu ? (
        <BreadcrumbSiblings label={label} siblings={menu} named />
      ) : (
        <BreadcrumbSegmentButton segment={segment} index={index} current={current} drop={drop} onNavigate={onNavigate} />
      )}
      {menu !== undefined && !asMenu && <BreadcrumbSiblings label={label} siblings={menu} named={false} />}
      {menu !== undefined && spring.openId === id && <BreadcrumbSpringMenu anchorRef={itemRef} label={label} siblings={menu} onClose={spring.close} />}
    </Box>
  );
};

export { BreadcrumbItem };
