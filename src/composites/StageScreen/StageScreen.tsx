/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { ScreenWindow } from '../ScreenWindow';
import { StageBar } from './sub-components/StageBar';
import type { StageScreenProps } from './StageScreen.type';
import './StageScreen.css';

const StageScreen = (props: StageScreenProps) => {
  const { title, onClose, children, subtitle, toolbar, done, floating, hidden, className = '' } = props;

  return (
    <ScreenWindow
      title={title}
      subtitle={subtitle}
      floating={floating}
      hidden={hidden}
      onClose={onClose}
      className={`stage-screen${className ? ` ${className}` : ''}`}
    >
      <StageBar toolbar={toolbar} done={done} />
      <Box className="stage-screen__stage">{children}</Box>
    </ScreenWindow>
  );
};

export { StageScreen };
