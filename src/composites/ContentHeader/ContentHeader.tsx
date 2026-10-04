/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { HEADING_TAGS } from './ContentHeader.constants';
import type { ContentHeaderProps } from './ContentHeader.type';
import { ContentHeaderArt } from './sub-components/ContentHeaderArt';
import '../../theme/icon-glow.css';
import './ContentHeader.css';

const headerClass = (compact: boolean, className?: string): string =>
  ['content-header', compact && 'content-header--compact', className].filter(Boolean).join(' ');

const ContentHeader = (props: ContentHeaderProps) => {
  const { title, icon, backdrop, strip, actions, compact = false, level = 2, titleId, live = false, className } = props;
  return (
    <Box as="header" className={headerClass(compact, className)}>
      {backdrop !== null && <Box className="content-header__backdrop">{backdrop ?? <ContentHeaderArt />}</Box>}
      {icon != null && <Box as="span" className="content-header__icon icon-glow" aria-hidden="true">{icon}</Box>}
      <Text as={HEADING_TAGS[level]} id={titleId} className="content-header__title" aria-live={live ? 'polite' : undefined}>{title}</Text>
      {strip}
      {actions != null && <Box className="content-header__actions">{actions}</Box>}
    </Box>
  );
};

export { ContentHeader };
