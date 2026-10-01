/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Callout } from '../../../primitives/Callout';
import { Icon } from '../../../primitives/Icon';
import { Paragraph } from '../../../primitives/text-elements';
import { Title } from '../../../primitives/Title';
import { useFocusOnOpen } from './behavior/useFocusOnOpen';
import type { WizardStepProps } from './WizardStep.type';
import './WizardStep.css';

const WizardStep = (props: WizardStepProps) => {
  const { title, description, error, level = 2, focusOnOpen = true, className = '', children } = props;
  const headingRef = useFocusOnOpen<HTMLHeadingElement>(focusOnOpen);
  return (
    <Box as="section" className={`wizard-step${className ? ` ${className}` : ''}`} aria-label={title}>
      <Box className="wizard-step__head">
        <Title ref={headingRef} level={level} tabIndex={-1} className="wizard-step__title">{title}</Title>
        {description != null && <Paragraph tone="dim" className="wizard-step__description">{description}</Paragraph>}
      </Box>
      {error != null && error !== '' && (
        <Box role="alert" className="wizard-step__error">
          <Callout tone="danger" icon={<Icon name="circle-alert" />}>{error}</Callout>
        </Box>
      )}
      <Box className="wizard-step__body">{children}</Box>
    </Box>
  );
};

export { WizardStep };
