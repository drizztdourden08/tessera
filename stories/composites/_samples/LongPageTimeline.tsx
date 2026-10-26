/* @layer stories @kind component */
import { SectionTimeline } from '../../../src/composites';
import { Box, Paragraph, ScrollArea, Title } from '../../../src/primitives';
import type { LongPageTimelineProps } from './LongPageTimeline.type';
import { SECTION_ATTRIBUTE, SECTION_COPY, TIMELINE_GROUPS, TIMELINE_TEXT } from './section-timeline-story.constants';
import { useLongPage } from './useLongPage';
import './LongPageTimeline.css';

const SECTIONS = TIMELINE_GROUPS.flatMap((group) => group.children);

const LongPageTimeline = (props: LongPageTimelineProps) => {
  const { state = 'live' } = props;
  const { ref, activeId, progress, onScroll, onJump } = useLongPage();
  return (
    <Box className="long-page">
      <SectionTimeline
        className="long-page__timeline"
        ariaLabel={TIMELINE_TEXT.label}
        groups={TIMELINE_GROUPS}
        activeId={activeId}
        progress={progress}
        state={state}
        onJump={onJump}
      />
      <ScrollArea ref={ref} className="long-page__scroll" onScroll={onScroll}>
        <Paragraph tone="dim">{TIMELINE_TEXT.intro}</Paragraph>
        {SECTIONS.map((section) => (
          <Box as="section" key={section.id} id={section.id} className="long-page__section" {...{ [SECTION_ATTRIBUTE]: '' }}>
            <Title level={3}>{section.label}</Title>
            <Paragraph>{SECTION_COPY}</Paragraph>
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

export { LongPageTimeline };
