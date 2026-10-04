/* @layer renderer-components @kind component */
import { Link } from '../../../primitives/Link';
import { Pressable } from '../../../primitives/Pressable';
import { Title } from '../../../primitives/Title';
import type { ItemCardTitleProps } from '../ItemCard.type';

const ItemCardTitle = (props: ItemCardTitleProps) => {
  const { title, href, onOpen, selected, level } = props;
  const current = selected ? 'true' : undefined;
  if (href !== undefined) {
    return <Title level={level} className="item-card__title"><Link href={href} tone="neutral" className="item-card__open" aria-current={current} onClick={onOpen}>{title}</Link></Title>;
  }
  if (onOpen) {
    return <Title level={level} className="item-card__title"><Pressable className="item-card__open" aria-current={current} onClick={onOpen}>{title}</Pressable></Title>;
  }
  return <Title level={level} className="item-card__title">{title}</Title>;
};

export { ItemCardTitle };
