/* @layer stories @kind component */
import { Button, Icon } from '../../../../src/primitives';
import type { EditorActionsProps } from './EditorActions.type';

const EditorActions = ({ state, onSave, onReset }: EditorActionsProps) => (
  <>
    <Button size="sm" variant="ghost" icon={<Icon name="rotate-ccw" size={14} />} disabled={state === 'clean' || state === 'saved'} onClick={onReset}>
      Reset all
    </Button>
    <Button size="sm" variant="primary" icon={<Icon name="save" size={14} />} loading={state === 'saving'} disabled={state === 'clean' || state === 'saved'} onClick={onSave}>
      Save
    </Button>
  </>
);

export { EditorActions };
