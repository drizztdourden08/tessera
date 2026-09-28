/* @layer renderer-components @kind component */
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import type { GroupTitleProps } from './GroupTitle.type';

const GroupTitle = (props: GroupTitleProps) => {
  const { group, activeId, onSelect } = props;
  const { id, title } = group;
  if (id === undefined) return <Text className="side-nav__group-title">{title}</Text>;
  return (
    <Pressable
      className={`side-nav__group-title side-nav__group-title--action${id === activeId ? ' side-nav__group-title--active' : ''}`}
      onClick={() => onSelect(id)}
    >
      {title}
    </Pressable>
  );
};

export { GroupTitle };
