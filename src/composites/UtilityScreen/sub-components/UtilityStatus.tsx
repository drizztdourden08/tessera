/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Icon } from '../../../primitives/Icon';
import { Spinner } from '../../../primitives/Spinner';
import { Text } from '../../../primitives/Text';
import { Paragraph } from '../../../primitives/text-elements';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { TONE_ICONS } from '../UtilityScreen.constants';
import type { UtilityStatusProps } from './UtilityStatus.type';

const UtilityStatus = (props: UtilityStatusProps) => {
  const { status } = props;
  const { common } = useTesseraStrings();
  const { tone, title, message } = status;

  return (
    <Box className={`utility-screen__status utility-screen__status--${tone}`} role="status" aria-live="polite">
      <Box as="span" className="utility-screen__mark" aria-hidden={tone !== 'busy'}>
        {tone === 'busy' ? <Spinner size="lg" label={common.loading} /> : <Icon name={TONE_ICONS[tone]} size={40} />}
      </Box>
      <Text as="h3" className="utility-screen__title">{title}</Text>
      {message != null && <Paragraph tone="muted" className="utility-screen__message">{message}</Paragraph>}
    </Box>
  );
};

export { UtilityStatus };
