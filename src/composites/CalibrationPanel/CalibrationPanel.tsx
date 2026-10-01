/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Button } from '../../primitives/Button';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Stack } from '../../primitives/Stack';
import { Text } from '../../primitives/Text';
import { Paragraph, Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { CalibrationPanelProps } from './CalibrationPanel.type';
import './CalibrationPanel.css';

const CalibrationPanel = (props: CalibrationPanelProps) => {
  const { common } = useTesseraStrings();
  const { title, instruction, readout, action, onCancel, cancelLabel = common.cancel, children, className = '' } = props;
  const titleId = useId();

  return (
    <Stack
      as="section"
      gap="sm"
      aria-labelledby={titleId}
      className={`calibration-panel${className ? ` ${className}` : ''}`}
    >
      <Text as="h4" id={titleId} className="calibration-panel__title">{title}</Text>
      <Paragraph tone="muted" className="calibration-panel__instruction">{instruction}</Paragraph>
      {readout != null && <Span tone="dim" className="calibration-panel__readout">{readout}</Span>}
      {children}
      <ButtonRow>
        <Button variant="ghost" size="sm" onClick={onCancel}>{cancelLabel}</Button>
        <Button variant="primary" size="sm" disabled={action.disabled} onClick={action.onClick}>{action.label}</Button>
      </ButtonRow>
    </Stack>
  );
};

export { CalibrationPanel };
