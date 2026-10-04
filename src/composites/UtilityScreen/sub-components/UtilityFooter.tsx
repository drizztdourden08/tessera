/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
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
        <Tooltip content={label}>
          <IconButton variant="ghost" tone="danger" label={label} onClick={report.onClick}>
            <Icon name="bug" size={16} />
          </IconButton>
        </Tooltip>
      )}
      <Box className="utility-screen__actions">
        {actions.map((action) => (
          <Button key={action.label} variant={action.variant ?? 'secondary'} disabled={action.disabled} loading={action.loading} onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export { UtilityFooter };
