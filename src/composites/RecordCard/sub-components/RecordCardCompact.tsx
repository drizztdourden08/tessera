/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { RecordHeader } from '../../RecordHeader';
import type { RecordCardCompactProps } from './RecordCardCompact.type';

const RecordCardCompact = ({ title, icon, code, content, end, menu, chevronOnIcon, menuOnHover }: RecordCardCompactProps) => {
  const trailing = end != null || menu != null ? <Flex align="center" gap="xs">{end}{menu}</Flex> : undefined;
  return (
    <>
      <RecordHeader icon={icon} code={code} content={content} menu={trailing} density="row" chevronOnIcon={chevronOnIcon} menuOnHover={menuOnHover} />
      <Text variant="label" className="record-card__compact-title">{title}</Text>
    </>
  );
};

export { RecordCardCompact };
