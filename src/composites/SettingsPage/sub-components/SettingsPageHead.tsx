/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import type { SettingsPageHeadProps } from './SettingsPageHead.type';
import '../../../theme/icon-glow.css';

const SettingsPageHead = (props: SettingsPageHeadProps) => {
  const { icon, title, backdrop, actions, children } = props;
  return (
    <Box as="header" className="settings-page__head">
      {backdrop != null && <Box className="settings-page__backdrop">{backdrop}</Box>}
      <Box as="span" className="settings-page__icon icon-glow" aria-hidden="true">{icon}</Box>
      <Text as="h2" className="settings-page__title">{title}</Text>
      {children}
      {actions != null && <Box className="settings-page__actions">{actions}</Box>}
    </Box>
  );
};

export { SettingsPageHead };
