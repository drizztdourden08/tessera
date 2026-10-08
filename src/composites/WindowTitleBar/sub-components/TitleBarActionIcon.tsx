/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import type { StatusTone } from '../../../primitives/Status';
import type { TitleBarActionIconProps } from './TitleBarActionIcon.type';
import './TitleBarActionIcon.css';

const toneClass = (tone?: StatusTone): string | undefined =>
  (tone === undefined || tone === 'neutral' ? undefined : `window-title-bar__icon--${tone}`);

const TitleBarActionIcon = (props: TitleBarActionIconProps) => {
  const { action, size } = props;
  return <Icon name={action.icon} size={size} effect={action.effect} className={toneClass(action.tone)} />;
};

export { TitleBarActionIcon };
