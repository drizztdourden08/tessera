/* @layer renderer-components @kind component */
import { Children, useMemo } from 'react';
import { Box } from '../Box';
import { mergeRefs } from '../dom/merge-refs';
import { ROOT_CLASS, TRACK_CLASS } from './scroll-strip.constants';
import type { ScrollStripProps } from './scroll-strip.type';
import { ScrollStripPager } from './ScrollStripPager';
import { useScrollStrip } from './useScrollStrip';
import './ScrollStrip.css';

const classes = (own: string, extra?: string): string => (extra ? `${own} ${extra}` : own);

const ScrollStrip = (props: ScrollStripProps) => {
  const { pagerLabels, children, as = 'div', trackAs = 'div', className, trackClassName, trackRole, trackRef, 'aria-label': ariaLabel } = props;
  const strip = useScrollStrip(Children.count(children));
  const track = useMemo(() => mergeRefs(strip.trackRef, trackRef), [strip.trackRef, trackRef]);

  return (
    <Box
      as={as}
      ref={strip.rootRef}
      className={classes(ROOT_CLASS, className)}
      aria-label={ariaLabel}
      data-back={strip.canScrollBack || undefined}
      data-forward={strip.canScrollForward || undefined}
    >
      {strip.canScrollBack && <ScrollStripPager side="back" label={pagerLabels.back} onPage={() => strip.pageBy(-1)} />}
      <Box as={trackAs} ref={track} className={classes(TRACK_CLASS, trackClassName)} role={trackRole} onScroll={strip.handleScroll}>
        {children}
      </Box>
      {strip.canScrollForward && <ScrollStripPager side="forward" label={pagerLabels.forward} onPage={() => strip.pageBy(1)} />}
    </Box>
  );
};

export { ScrollStrip };
