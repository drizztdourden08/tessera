/* @layer stories @kind component */
import { Icon, IconButton } from '../../../src/primitives';

type SpoilerActionProps = {
  shown: boolean;
  onToggle: () => void;
};

const SpoilerAction = (props: SpoilerActionProps) => {
  const { shown, onToggle } = props;
  const label = shown ? 'Hide spoilers' : 'Show spoilers';
  return (
    <IconButton className="widget__btn" label={label} title={label} active={shown} onClick={onToggle}>
      <Icon name={shown ? 'eye' : 'eye-off'} size={12} />
    </IconButton>
  );
};

export { SpoilerAction };
