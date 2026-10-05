/* @layer renderer-components @kind component */
import { Stepper } from '../../../primitives/Stepper';
import type { TaskStepsProps } from '../TaskProgress.type';

const TaskSteps = (props: TaskStepsProps) => {
  const { steps, currentId, state } = props;
  const current = currentId ?? steps[0]?.id ?? '';
  const marked = state === 'failed' ? steps.map((step) => (step.id === current ? { ...step, error: true } : step)) : steps;
  return (
    <Stepper
      className="task-progress__steps"
      orientation="vertical"
      reserve="none"
      steps={marked}
      currentId={current}
      complete={state === 'done'}
    />
  );
};

export { TaskSteps };
