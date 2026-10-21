/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SectionHeader } from '../../primitives/SectionHeader';
import type { PanelContainerProps } from './PanelContainer.type';
import './PanelContainer.css';

const PanelContainer = (props: PanelContainerProps) => {
  const { title, action, level = 3, children, className } = props;
  return (
    <Box as="section" className={['panel-container', className].filter(Boolean).join(' ')}>
      <SectionHeader title={title} level={level} action={action} />
      <Box className="panel-container__body">{children}</Box>
    </Box>
  );
};

export { PanelContainer };
