/* @layer renderer-components @kind component */
import { Disclosure } from '../../../primitives/Disclosure';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { LogPanel } from '../../LogPanel';
import type { TaskLogProps } from '../TaskProgress.type';

const TaskLog = (props: TaskLogProps) => {
  const { rows, kinds, open, onToggle, height } = props;
  const { panels } = useTesseraStrings();
  return (
    <Disclosure summary={open ? panels.hideLog : panels.showLog(rows.length)} defaultOpen={open} onOpenChange={onToggle} className="task-progress__log">
      {open && <LogPanel rows={rows} kinds={kinds} height={height} />}
    </Disclosure>
  );
};

export { TaskLog };
