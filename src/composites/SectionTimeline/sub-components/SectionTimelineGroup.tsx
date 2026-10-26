/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../primitives/Box';
import { Link } from '../../../primitives/Link';
import { Text } from '../../../primitives/Text';
import { jumpNavigate } from '../behavior/jump-navigate';
import type { SectionTimelineGroupProps } from './SectionTimelineGroup.type';
import './SectionTimelineGroup.css';

const SectionTimelineGroup = (props: SectionTimelineGroupProps) => {
  const { group, activeId, onJump } = props;
  const titleId = useId();
  return (
    <Box as="li" className="section-timeline__group">
      <Text as="span" variant="overline" id={titleId} className="section-timeline__title">{group.label}</Text>
      <Box as="ul" className="section-timeline__links" aria-labelledby={titleId}>
        {group.children.map((child) => (
          <Box as="li" key={child.id}>
            <Link
              href={child.href}
              className="section-timeline__link"
              aria-current={child.id === activeId ? 'location' : undefined}
              navigate={jumpNavigate(onJump, child.id)}
            >
              {child.label}
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { SectionTimelineGroup };
