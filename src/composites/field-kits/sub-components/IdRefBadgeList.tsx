/* @layer renderer-components @kind component */
import { Badge } from '../../../primitives/Badge';
import { Flex } from '../../../primitives/Flex';
import { formatIdRefDisplay } from '../id-ref-format';
import { toText } from '../to-text';
import type { IdRefBadgeListProps } from './IdRefBadgeList.type';

const IdRefBadgeList = (props: IdRefBadgeListProps) => {
  const { list, targetKind, resolveIdRefDisplay } = props;

  return (
    <Flex gap="xs" wrap className="field-kit__ref-list">
      {list.map((entry, index) => {
        const id = toText(entry).trim();
        if (!id) return null;
        const display = formatIdRefDisplay(id, resolveIdRefDisplay?.(id, targetKind));
        return (
          <Badge
            key={`${id}-${index}`}
            variant="neutral"
            className="field-kit__ref-chip"
            title={targetKind ? `${targetKind}: ${id}` : id}
            data-id-ref={id}
            data-target-kind={targetKind}
          >
            {display}
          </Badge>
        );
      })}
    </Flex>
  );
};

export { IdRefBadgeList };
