/* @layer renderer-components @kind component */
import { Tag } from '../../../primitives/Tag';
import { chipLook } from '../behavior/chip-look';
import type { SignalItem } from '../SignalStrip.type';
import { SignalMark } from './SignalMark';

const SignalChip = ({ item }: { item: SignalItem }) => {
  const { icon, count, label, tone, mark2, iconOnly = false, onClick } = item;
  const text = count === undefined ? (iconOnly ? '' : label) : String(count);
  const body = mark2 === undefined ? text : <><SignalMark mark={mark2} />{text}</>;
  if (onClick === undefined) return <Tag {...chipLook(tone)} icon={icon} title={label}>{body}</Tag>;
  return <Tag {...chipLook(tone)} icon={icon} title={label} onClick={onClick}>{body}</Tag>;
};

export { SignalChip };
