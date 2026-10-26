/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { timelineProgress } from './behavior/timeline-progress';
import { timelineStyle } from './behavior/timeline-style';
import { SectionTimelineGroup } from './sub-components/SectionTimelineGroup';
import type { SectionTimelineProps } from './SectionTimeline.type';
import './SectionTimeline.css';

const driverOf = (timeline: SectionTimelineProps['timeline']): string | undefined => {
  if (timeline === undefined) return undefined;
  return timeline === 'scroll' ? 'scroll' : 'named';
};

const SectionTimeline = (props: SectionTimelineProps) => {
  const { groups, ariaLabel, activeId, onJump, state = 'live', progress, timeline, className = '' } = props;
  return (
    <Box
      as="nav"
      className={`section-timeline${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
      hidden={state === 'hidden'}
      data-state={state}
      data-timeline={driverOf(timeline)}
      style={timelineStyle(timelineProgress(groups, activeId, progress), timeline)}
    >
      <Box className="section-timeline__line" aria-hidden="true">
        <Box className="section-timeline__fill" />
      </Box>
      <Box as="ul" className="section-timeline__groups">
        {groups.map((group) => <SectionTimelineGroup key={group.id} group={group} activeId={activeId} onJump={onJump} />)}
      </Box>
    </Box>
  );
};

export { SectionTimeline };
