/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Text } from '../../primitives/Text';
import { NavigatorMap } from './sub-components/NavigatorMap';
import type { NavigatorProps } from './Navigator.type';
import './Navigator.css';

const Navigator = (props: NavigatorProps) => {
  const { surface, empty, caption, className } = props;
  if (empty !== undefined && (surface.width <= 0 || surface.height <= 0)) {
    return <Box className={['navigator', 'navigator--empty', className].filter(Boolean).join(' ')}>{empty}</Box>;
  }
  if (caption === undefined) return <NavigatorMap {...props} />;
  return (
    <Box className="navigator-frame">
      <NavigatorMap {...props} />
      <Text variant="caption" tone="muted">{caption}</Text>
    </Box>
  );
};

export { Navigator };
