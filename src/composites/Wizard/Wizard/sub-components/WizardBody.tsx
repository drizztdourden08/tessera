/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { ScrollArea } from '../../../../primitives/ScrollArea';
import { useScrollTopOn } from '../behavior/useScrollTopOn';
import type { WizardBodyProps } from './WizardBody.type';
import './WizardBody.css';

const WizardBody = (props: WizardBodyProps) => {
  const { orientation, stepKey, title, progress, step, nav, className } = props;
  const scrollRef = useScrollTopOn(stepKey);
  return (
    <Box className={`wizard${className ? ` ${className}` : ''}`} data-orientation={orientation}>
      <Box className="wizard__rail">
        {title}
        {progress}
      </Box>
      <Box className="wizard__main">
        <ScrollArea ref={scrollRef} className="wizard__scroll">{step}</ScrollArea>
        {nav}
      </Box>
    </Box>
  );
};

export { WizardBody };
