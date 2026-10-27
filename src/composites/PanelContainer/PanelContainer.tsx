/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { SectionHeader } from '../../primitives/SectionHeader';
import { TitleStrip } from '../title-strip/TitleStrip';
import type { PanelContainerProps } from './PanelContainer.type';
import './PanelContainer.css';

const PanelContainer = (props: PanelContainerProps) => {
  const { title, sublabel, action, level = 3, fill = false, children, className } = props;
  return (
    <Box as="section" className={['panel-container', fill && 'panel-container--fill', className].filter(Boolean).join(' ')}>
      <SectionHeader title={sublabel == null ? title : <TitleStrip title={title} sublabel={sublabel} />} level={level} action={action} />
      <Box className={fill ? 'panel-container__body panel-container__body--fill' : 'panel-container__body'}>{children}</Box>
    </Box>
  );
};

export { PanelContainer };
