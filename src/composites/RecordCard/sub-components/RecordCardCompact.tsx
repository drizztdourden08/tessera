/* @layer renderer-components @kind component */
import { Flex } from '../../../primitives/Flex';
import { Text } from '../../../primitives/Text';
import { TickerText } from '../../../primitives/TickerText';
import { RecordHeader } from '../../RecordHeader';
import type { RecordCardCompactProps } from './RecordCardCompact.type';

const RecordCardCompact = ({ title, icon, code, content, end, menu, chevronOnIcon }: RecordCardCompactProps) => {
  const trailing = end != null || menu != null ? <Flex align="center" gap="xs">{end}{menu}</Flex> : undefined;
  return (
    <>
      <RecordHeader icon={icon} code={code} content={content != null ? <TickerText>{content}</TickerText> : undefined} menu={trailing} density="row" chevronOnIcon={chevronOnIcon} />
      <TickerText><Text variant="label">{title}</Text></TickerText>
    </>
  );
};

export { RecordCardCompact };
