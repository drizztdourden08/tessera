/* @layer stories @kind component */
import { Button, Icon } from '../../../../src/primitives';
import type { SessionActionsProps } from './EditorActions.type';

const SessionActions = ({ onRun }: SessionActionsProps) => (
  <>
    <Button size="sm" variant="ghost" icon={<Icon name="bookmark" size={14} />}>Save as template</Button>
    <Button size="sm" variant="primary" icon={<Icon name="play" size={14} />} onClick={onRun}>Run</Button>
  </>
);

export { SessionActions };
