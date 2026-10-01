/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { ScrollArea } from '../../../../primitives/ScrollArea';
import { useScrollTopOn } from '../behavior/useScrollTopOn';
import type { WizardFrameBodyProps } from './WizardFrameBody.type';

const WizardFrameBody = (props: WizardFrameBodyProps) => {
  const { orientation, presentation, stepKey, title, progress, step, nav, className } = props;
  const scrollRef = useScrollTopOn(stepKey);
  return (
    <Box
      className={`wizard-frame${className ? ` ${className}` : ''}`}
      data-orientation={orientation}
      data-presentation={presentation}
    >
      <Box className="wizard-frame__rail">
        {title}
        {progress}
      </Box>
      <Box className="wizard-frame__main">
        <ScrollArea ref={scrollRef} className="wizard-frame__scroll">{step}</ScrollArea>
        <Box className="wizard-frame__footer">{nav}</Box>
      </Box>
    </Box>
  );
};

export { WizardFrameBody };
