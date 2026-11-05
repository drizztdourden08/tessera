/* @layer renderer-components @kind component */
import { Tag } from '../../../primitives/Tag';
import { chipLook } from '../behavior/chip-look';
import type { SignalItem } from '../SignalStrip.type';
import { SignalMark } from './SignalMark';

const SignalChip = ({ item }: { item: SignalItem }) => {
  const { icon, count, label, tone, mark2, iconOnly = false, onClick } = item;
  const text = count === undefined ? (iconOnly ? '' : label) : String(count);
  const body = mark2 === undefined ? text : <><SignalMark mark={mark2} />{text}</>;
  const named = { ...chipLook(tone), icon, title: label, 'aria-label': iconOnly ? label : undefined };
  if (onClick === undefined) return <Tag {...named}>{body}</Tag>;
  return <Tag {...named} onClick={onClick}>{body}</Tag>;
};

export { SignalChip };
