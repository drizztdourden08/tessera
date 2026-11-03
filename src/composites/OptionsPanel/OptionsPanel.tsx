/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Tabs } from '../../primitives/Tabs';
import { Text } from '../../primitives/Text';
import type { OptionsPanelProps } from './OptionsPanel.type';
import './OptionsPanel.css';

const OptionsPanel = (props: OptionsPanelProps) => {
  const { title, tabs, activeTab, onTabChange, toolbar, aside, className, children } = props;
  return (
    <Box className={['options-panel', className].filter(Boolean).join(' ')}>
      <Box className="options-panel__main">
        <Box className="options-panel__head">
          <Box className="options-panel__bar">
            <Text className="options-panel__title">{title}</Text>
            {toolbar !== undefined && <Box className="options-panel__toolbar">{toolbar}</Box>}
          </Box>
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} hideZero />
        </Box>
        <Box className="options-panel__body">{children}</Box>
      </Box>
      {aside !== undefined && <Box className="options-panel__aside">{aside}</Box>}
    </Box>
  );
};

export { OptionsPanel };
