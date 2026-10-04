/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { Box, Flex, Icon, Spinner, Stack, Status, Text } from '../../../src/primitives';
import type { IconName, StatusTone } from '../../../src/primitives';

type CheckState = 'pass' | 'warn' | 'fail' | 'pending' | 'skip';
type Check = { id: string; label: string; state: CheckState; detail?: ReactNode; action?: ReactNode };
type CheckListProps = { checks: readonly Check[]; summary?: ReactNode; compact?: boolean };

const LOOK: Record<CheckState, { icon: IconName; tone: StatusTone; word: string }> = {
  pass: { icon: 'circle-check', tone: 'success', word: 'passed' },
  warn: { icon: 'triangle-alert', tone: 'warning', word: 'advice' },
  fail: { icon: 'circle-x', tone: 'danger', word: 'failed' },
  pending: { icon: 'loader-circle', tone: 'info', word: 'checking' },
  skip: { icon: 'circle', tone: 'neutral', word: 'skipped' },
};

const count = (checks: readonly Check[], state: CheckState) => checks.filter((c) => c.state === state).length;

const CheckList = ({ checks, summary }: CheckListProps) => (
  <Stack gap="sm">
    <Flex gap="md" align="center" className="spike-check-summary">
      {summary}
      {(['pass', 'warn', 'fail', 'pending'] as const).filter((s) => count(checks, s) > 0).map((s) => (
        <Status key={s} tone={LOOK[s].tone} dot>{`${count(checks, s)} ${LOOK[s].word}`}</Status>
      ))}
    </Flex>
    <Box as="ul" className="spike-checks">
      {checks.map((c) => (
        <Box as="li" key={c.id} className="spike-check" data-state={c.state}>
          <Box className="spike-check__icon">{c.state === 'pending' ? <Spinner size="sm" /> : <Icon name={LOOK[c.state].icon} />}</Box>
          <Stack gap="xs" className="spike-check__text">
            <Text variant="body">{c.label}</Text>
            {c.detail && <Text variant="caption">{c.detail}</Text>}
          </Stack>
          {c.action}
        </Box>
      ))}
    </Box>
  </Stack>
);

export { CheckList };
export type { Check, CheckListProps, CheckState };
