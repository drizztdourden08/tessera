/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { StatusBarSwatchProps } from './StatusBarSwatch.type';

const StatusBarSwatch = (props: StatusBarSwatchProps) => {
  const { color } = props;
  return <Box as="span" className="status-bar__swatch" style={{ background: color }} aria-hidden />;
};

export { StatusBarSwatch };
