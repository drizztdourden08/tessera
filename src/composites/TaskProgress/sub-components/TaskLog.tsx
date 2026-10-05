/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { LogPanel } from '../../LogPanel';
import type { TaskLogProps } from '../TaskProgress.type';

const TaskLog = (props: TaskLogProps) => {
  const { rows, kinds, open, onToggle, height } = props;
  const { panels } = useTesseraStrings();
  const id = useId();
  return (
    <Box className="task-progress__log">
      <Button
        variant="ghost"
        size="sm"
        icon={<Icon name={open ? 'chevron-down' : 'chevron-right'} />}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => onToggle(!open)}
      >
        {open ? panels.hideLog : panels.showLog(rows.length)}
      </Button>
      <Box id={id} className="task-progress__log-body" hidden={!open}>
        {open && <LogPanel rows={rows} kinds={kinds} height={height} />}
      </Box>
    </Box>
  );
};

export { TaskLog };
