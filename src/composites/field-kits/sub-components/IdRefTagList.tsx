/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Tag } from '../../../primitives/Tag';
import { formatIdRefDisplay } from '../id-ref-format';
import { toText } from '../to-text';
import type { IdRefTagListProps } from './IdRefTagList.type';

const IdRefTagList = (props: IdRefTagListProps) => {
  const { list, targetKind, resolveIdRefDisplay } = props;

  return (
    <Flex gap="xs" wrap className="field-kit__ref-list">
      {list.map((entry, index) => {
        const id = toText(entry).trim();
        if (!id) return null;
        const display = formatIdRefDisplay(id, resolveIdRefDisplay?.(id, targetKind));
        return (
          <Tag
            key={`${id}-${index}`}
            title={targetKind ? `${targetKind}: ${id}` : id}
            data-id-ref={id}
            data-target-kind={targetKind}
          >
            {display}
          </Tag>
        );
      })}
    </Flex>
  );
};

export { IdRefTagList };
