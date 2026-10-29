/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import type { WindowHeaderTitlesProps } from '../WindowHeader.type';

const WindowHeaderTitles = (props: WindowHeaderTitlesProps) => {
  const { eyebrow, title, titleId, subtitle, eyebrowActions } = props;
  const classes = eyebrow == null ? 'window-header__titles' : 'window-header__titles window-header__titles--eyebrow';
  return (
    <Box className={classes}>
      {eyebrow != null && eyebrowActions == null && <Text className="window-header__eyebrow">{eyebrow}</Text>}
      {eyebrow != null && eyebrowActions != null && (
        <Box className="window-header__eyebrow-row">
          <Text className="window-header__eyebrow">{eyebrow}</Text>
          {eyebrowActions}
        </Box>
      )}
      <Text as="h3" id={titleId} className="window-header__title">{title}</Text>
      {subtitle && <Text className="window-header__subtitle">{subtitle}</Text>}
    </Box>
  );
};

export { WindowHeaderTitles };
