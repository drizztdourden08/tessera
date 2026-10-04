/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import type { ScreenPageHeadProps } from './ScreenPageHead.type';
import '../../../theme/icon-glow.css';

const ScreenPageHead = (props: ScreenPageHeadProps) => {
  const { icon, title, titleId, backdrop, strip, actions, live } = props;
  return (
    <Box as="header" className="screen-page__head">
      {backdrop != null && <Box className="screen-page__backdrop">{backdrop}</Box>}
      <Box as="span" className="screen-page__icon icon-glow" aria-hidden="true">{icon}</Box>
      <Text as="h2" id={titleId} className="screen-page__title" aria-live={live ? 'polite' : undefined}>{title}</Text>
      {strip}
      {actions != null && <Box className="screen-page__actions">{actions}</Box>}
    </Box>
  );
};

export { ScreenPageHead };
