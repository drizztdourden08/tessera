/* @layer stories @kind component */
import { Button, ButtonRow, Card, SectionHeader, Stack, StatRow } from '../../../src/primitives';
import type { CalibrationStepProps } from './CalibrationStep.type';

const CalibrationStep = (props: CalibrationStepProps) => {
  const { title, instruction, readout, action, onCancel, children } = props;
  return (
    <Card>
      <Stack gap="md">
        <SectionHeader title={title} subtitle={instruction} />
        <StatRow label="Reading" value={readout} mono />
        {children}
        <ButtonRow>
          <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" size="sm" disabled={action.disabled} onClick={action.onClick}>{action.label}</Button>
        </ButtonRow>
      </Stack>
    </Card>
  );
};

export { CalibrationStep };
