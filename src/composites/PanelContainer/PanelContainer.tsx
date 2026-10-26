/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SectionHeader } from '../../primitives/SectionHeader';
import type { PanelContainerProps } from './PanelContainer.type';
import './PanelContainer.css';

const PanelContainer = (props: PanelContainerProps) => {
  const { title, action, level = 3, fill = false, children, className } = props;
  return (
    <Box as="section" className={['panel-container', fill && 'panel-container--fill', className].filter(Boolean).join(' ')}>
      <SectionHeader title={title} level={level} action={action} />
      <Box className={fill ? 'panel-container__body panel-container__body--fill' : 'panel-container__body'}>{children}</Box>
    </Box>
  );
};

export { PanelContainer };
