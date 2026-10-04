/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { useBackFold } from './behavior/useBackFold';
import { HEADING_TAGS, TITLE_CLASS } from './ContentHeader.constants';
import type { ContentHeaderProps } from './ContentHeader.type';
import { ContentHeaderArt } from './sub-components/ContentHeaderArt';
import { ContentHeaderBack } from './sub-components/ContentHeaderBack';
import '../../theme/icon-glow.css';
import './ContentHeader.css';

const headerClass = (compact: boolean, className?: string): string =>
  ['content-header', compact && 'content-header--compact', className].filter(Boolean).join(' ');

const ContentHeader = (props: ContentHeaderProps) => {
  const { title, icon, back, backdrop, strip, actions, compact = false, level = 2, titleId, live = false, className } = props;
  const headerRef = useRef<HTMLElement>(null);
  const folded = useBackFold(headerRef, back);
  return (
    <Box ref={headerRef} as="header" className={headerClass(compact, className)}>
      {backdrop !== null && <Box className="content-header__backdrop">{backdrop ?? <ContentHeaderArt />}</Box>}
      {back && <ContentHeaderBack back={back} folded={folded} />}
      {icon != null && <Box as="span" className="content-header__icon icon-glow" aria-hidden="true">{icon}</Box>}
      <Text as={HEADING_TAGS[level]} id={titleId} className={TITLE_CLASS} aria-live={live ? 'polite' : undefined}>{title}</Text>
      {strip}
      {actions != null && <Box className="content-header__actions">{actions}</Box>}
    </Box>
  );
};

export { ContentHeader };
