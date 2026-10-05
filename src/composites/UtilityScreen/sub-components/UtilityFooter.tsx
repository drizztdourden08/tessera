/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { Paragraph } from '../../../primitives/text-elements';
import { Tooltip } from '../../../primitives/Tooltip';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { UtilityFooterProps } from './UtilityFooter.type';

const UtilityFooter = (props: UtilityFooterProps) => {
  const { report, actions } = props;
  const { common } = useTesseraStrings();
  const label = report?.label ?? common.reportIssue;

  return (
    <Box className="utility-screen__footer">
      {report && (
        <Box className="utility-screen__footnote">
          {report.footnote != null && <Paragraph className="utility-screen__footnote-text">{report.footnote}</Paragraph>}
          <Tooltip content={label}>
            <IconButton variant="ghost" tone="danger" size="sm" label={label} className="utility-screen__report" onClick={report.onSelect}>
              <Icon name="bug" size={14} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {actions.length > 0 && (
        <Box className="utility-screen__actions">
          {actions.map((action) => (
            <Button key={action.label} variant={action.tone ?? 'secondary'} disabled={action.disabled} loading={action.loading} onClick={action.onSelect}>
              {action.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export { UtilityFooter };
