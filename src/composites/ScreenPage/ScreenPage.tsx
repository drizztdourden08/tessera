/* @layer renderer-components @kind component */
import { useId, useRef, useState } from 'react';
import { Box } from '../../primitives/Box';
import { ScrollArea } from '../../primitives/ScrollArea';
import { ContentHeader } from '../ContentHeader';
import { pageClasses } from './behavior/page-classes';
import { useCompactOnScroll } from './behavior/useCompactOnScroll';
import { useHeaderCheck } from './behavior/useHeaderCheck';
import { useStackedHeader } from './behavior/useStackedHeader';
import { STACK_CLASSES } from './ScreenPage.constants';
import type { ScreenPageProps } from './ScreenPage.type';
import '../../theme/page-card.css';
import './ScreenPage.css';

const shown = (node: unknown): boolean => node != null && node !== false;

const ScreenPage = (props: ScreenPageProps) => {
  const { icon, title, children, back, backdrop, strip, actions, footer, live = false, scroll = true, compact, bodyRef, bodyClassName, className } = props;
  const titleId = useId();
  const ownRef = useRef<HTMLDivElement>(null);
  const ref = bodyRef ?? ownRef;
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const scrolled = useCompactOnScroll(ref);
  const stack = useStackedHeader(root, [back, strip, actions].map(shown).join());
  useHeaderCheck(icon, title);
  const classes = pageClasses({ scroll, className, bodyClassName });

  return (
    <Box ref={setRoot} as="section" className={classes.root} aria-labelledby={titleId}>
      <ContentHeader
        icon={icon}
        title={title}
        titleId={titleId}
        back={back}
        backdrop={backdrop}
        strip={strip}
        actions={actions}
        live={live}
        compact={compact ?? scrolled}
        className={STACK_CLASSES[stack].join(' ') || undefined}
      />
      {scroll
        ? <ScrollArea ref={ref} className={classes.body}>{children}</ScrollArea>
        : <Box ref={ref} className={classes.body}>{children}</Box>}
      {footer != null && <Box className="screen-page__footer">{footer}</Box>}
    </Box>
  );
};

export { ScreenPage };
