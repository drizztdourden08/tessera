/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { Title } from '../../../../primitives/Title';
import type { WizardFrameHeadProps } from './WizardFrameHead.type';

const WizardFrameHead = (props: WizardFrameHeadProps) => {
  const { title, extra } = props;
  if (!title && extra == null) return null;
  return (
    <Box className="wizard-frame__head">
      {title && <Title level={2} className="wizard-frame__title">{title}</Title>}
      {extra}
    </Box>
  );
};

export { WizardFrameHead };
