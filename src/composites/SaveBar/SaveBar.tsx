/* @layer renderer-components @kind component */
import { Button } from '../../primitives/Button';
import { ButtonRow } from '../../primitives/ButtonRow';
import { Icon } from '../../primitives/Icon';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SaveBarStatus } from './sub-components/SaveBarStatus';
import type { SaveBarProps } from './SaveBar.type';
import './SaveBar.css';

const SaveBar = (props: SaveBarProps) => {
  const { state, error, onSave, onDiscard, saveLabel, discardLabel, className } = props;
  const { common, lists } = useTesseraStrings();
  const idle = state === 'clean' || state === 'saved';
  const saving = state === 'saving';
  const classes = ['save-bar', `save-bar--${state}`, className].filter(Boolean).join(' ');
  return (
    <ButtonRow variant="bar" className={classes} lead={<SaveBarStatus state={state} error={error} />}>
      {onDiscard && (
        <Button variant="ghost" icon={<Icon name="rotate-ccw" />} disabled={idle || saving} onClick={onDiscard}>
          {discardLabel ?? lists.discard}
        </Button>
      )}
      <Button variant="primary" icon={<Icon name="save" />} loading={saving} disabled={idle} onClick={onSave}>
        {saveLabel ?? common.save}
      </Button>
    </ButtonRow>
  );
};

export { SaveBar };
