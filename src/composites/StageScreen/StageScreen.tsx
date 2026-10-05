/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Button } from '../../primitives/Button';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useHeaderOptOutCheck } from '../ScreenPage/behavior/useHeaderOptOutCheck';
import { ScreenPage } from '../ScreenPage';
import { ScreenWindow } from '../ScreenWindow';
import type { StageScreenProps } from './StageScreen.type';
import './StageScreen.css';

const StageScreen = (props: StageScreenProps) => {
  const { title, icon, heading, onClose, children, subtitle, toolbar, done, backdrop, floating, hidden, className = '' } = props;
  const { common } = useTesseraStrings();
  useHeaderOptOutCheck('StageScreen', props);

  return (
    <ScreenWindow
      title={title}
      subtitle={subtitle}
      floating={floating}
      hidden={hidden}
      onClose={onClose}
      className={`stage-screen${className ? ` ${className}` : ''}`}
    >
      <ScreenPage
        icon={icon}
        title={heading}
        backdrop={backdrop}
        strip={toolbar != null && <Box className="stage-screen__toolbar">{toolbar}</Box>}
        actions={done && <Button variant="primary" disabled={done.disabled} onClick={done.onSelect}>{done.label ?? common.done}</Button>}
        bodyClassName="stage-screen__stage"
      >
        {children}
      </ScreenPage>
    </ScreenWindow>
  );
};

export { StageScreen };
