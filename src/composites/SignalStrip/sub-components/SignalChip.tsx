/* @layer renderer-components @kind component */
import { Tag } from '../../../primitives/Tag';
import { chipLook } from '../behavior/chip-look';
import type { SignalItem } from '../SignalStrip.type';

const SignalChip = ({ item }: { item: SignalItem }) => {
  const { icon, count, label, tone, onClick } = item;
  const text = count === undefined ? label : String(count);
  if (onClick === undefined) return <Tag {...chipLook(tone)} icon={icon} title={label}>{text}</Tag>;
  return <Tag {...chipLook(tone)} icon={icon} title={label} onClick={onClick}>{text}</Tag>;
};

export { SignalChip };
