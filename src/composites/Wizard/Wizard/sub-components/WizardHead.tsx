/* @layer renderer-components @kind component */
import { Box } from '../../../../primitives/Box';
import { Title } from '../../../../primitives/Title';
import type { WizardHeadProps } from './WizardHead.type';

const WizardHead = (props: WizardHeadProps) => {
  const { title, extra } = props;
  if (!title && extra == null) return null;
  return (
    <Box className="wizard__head">
      {title && <Title level={2} className="wizard__title">{title}</Title>}
      {extra}
    </Box>
  );
};

export { WizardHead };
