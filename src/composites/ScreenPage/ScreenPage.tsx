/* @layer renderer-components @kind component */
import { useId, useRef } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { ContentHeader } from '../ContentHeader';
import { pageClasses } from './behavior/page-classes';
import { useCompactOnScroll } from './behavior/useCompactOnScroll';
import { useHeaderCheck } from './behavior/useHeaderCheck';
import type { ScreenPageProps } from './ScreenPage.type';
import '../../theme/page-card.css';
import './ScreenPage.css';

const ScreenPage = (props: ScreenPageProps) => {
  const { icon, title, children, backdrop, strip, actions, footer, live = false, scroll = true, compact, bodyRef, bodyClassName, className } = props;
  const titleId = useId();
  const ownRef = useRef<HTMLDivElement>(null);
  const ref = bodyRef ?? ownRef;
  const scrolled = useCompactOnScroll(ref);
  useHeaderCheck(icon, title);
  const classes = pageClasses({ scroll, className, bodyClassName });

  return (
    <Box as="section" className={classes.root} aria-labelledby={titleId}>
      <ContentHeader icon={icon} title={title} titleId={titleId} backdrop={backdrop} strip={strip} actions={actions} live={live} compact={compact ?? scrolled} />
      {scroll
        ? <ScrollArea ref={ref} className={classes.body}>{children}</ScrollArea>
        : <Box ref={ref} className={classes.body}>{children}</Box>}
      {footer != null && <Box className="screen-page__footer">{footer}</Box>}
    </Box>
  );
};

export { ScreenPage };
