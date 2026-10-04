/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Spinner } from '../../../primitives/Spinner';
import { TONE_ICONS } from '../UtilityScreen.constants';
import type { UtilityMarkProps } from './UtilityMark.type';

const UtilityMark = (props: UtilityMarkProps) => {
  const { tone, icon } = props.status;
  if (tone === 'busy') return <Spinner size="md" />;
  return icon ?? <Icon name={TONE_ICONS[tone]} />;
};

export { UtilityMark };
