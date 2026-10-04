/* @layer stories @kind component */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Box, Button, Flex, Icon, Stack, Text } from '../../../src/primitives';

type Problem = { id: string; message: ReactNode; field?: string };
type ValidationSummaryProps = {
  title?: ReactNode;
  problems: readonly Problem[];
  max?: number;
  tone?: 'danger' | 'warning';
  onFocusField?: (field: string) => void;
};

const ValidationSummary = ({ title, problems, max = 4, tone = 'danger', onFocusField }: ValidationSummaryProps) => {
  const [open, setOpen] = useState(false);
  if (!problems.length) return null;
  const shown = open ? problems : problems.slice(0, max);
  const hidden = problems.length - shown.length;
  return (
    <Box role="alert" className="spike-summary" data-tone={tone}>
      <Flex gap="sm" align="start">
        <Icon name={tone === 'danger' ? 'circle-alert' : 'triangle-alert'} className="spike-summary__icon" />
        <Stack gap="xs">
          <Text variant="body" className="spike-strong">{title ?? `${problems.length} things to fix before saving`}</Text>
          <Box as="ul" className="spike-problems">
            {shown.map((p) => (
              <Box as="li" key={p.id}>
                {p.field && onFocusField
                  ? <button type="button" className="spike-problem-link" onClick={() => onFocusField(p.field ?? '')}>{p.message}<Icon name="arrow-right" /></button>
                  : <Text variant="body">{p.message}</Text>}
              </Box>
            ))}
          </Box>
          {hidden > 0 && <Box><Button size="sm" variant="ghost" onClick={() => setOpen(true)}>{`and ${hidden} more`}</Button></Box>}
        </Stack>
      </Flex>
    </Box>
  );
};

export { ValidationSummary };
export type { ValidationSummaryProps };
