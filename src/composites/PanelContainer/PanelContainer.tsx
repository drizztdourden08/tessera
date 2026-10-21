/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { CardHeader } from '../../primitives/Card/sub-components/CardHeader';
import type { PanelContainerProps } from './PanelContainer.type';
import './PanelContainer.css';

const PanelContainer = (props: PanelContainerProps) => {
  const { title, action, level = 3, children, className } = props;
  return (
    <Box as="section" className={['panel-container', className].filter(Boolean).join(' ')}>
      <CardHeader title={title} level={level} tone="primary" actions={action} />
      <Box className="panel-container__body">{children}</Box>
    </Box>
  );
};

export { PanelContainer };
