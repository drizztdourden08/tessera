/* @layer stories @kind component */
import { Flex, Span, StackedBar, Stack } from '../../../src/primitives';
import { formatGigabytes } from './format-gigabytes';
import { MEMORY_TOTAL } from './performance-feed.constants';
import type { PerformanceProcess } from './performance-feed.type';

const PerformanceMemory = (props: { processes: readonly PerformanceProcess[] }) => {
  const { processes } = props;
  const used = processes.reduce((sum, process) => sum + process.value, 0);
  return (
    <Stack gap="xs">
      <Flex justify="between" align="baseline">
        <Span tone="dim" className="performance-panel__heading">Memory</Span>
        <Span tone="muted" className="performance-panel__figure">{`${used.toFixed(1)} of ${MEMORY_TOTAL} GB`}</Span>
      </Flex>
      <StackedBar segments={processes} total={MEMORY_TOTAL} limit={6} legend label="Memory" format={formatGigabytes} />
    </Stack>
  );
};

export { PerformanceMemory };
