/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { Spinner } from '../../../primitives/Spinner';
import { Span } from '../../../primitives/text-elements';
import type { TreeTwistyProps } from './TreeTwisty.type';

const TreeTwisty = ({ branch, expanded, loading, onToggle }: TreeTwistyProps) => {
  if (!branch) return <Span className="tree__twisty" aria-hidden />;
  const press = onToggle ? (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onToggle();
  } : undefined;
  return (
    <Span className="tree__twisty" aria-hidden onClick={press}>
      {loading ? <Spinner size="sm" /> : <Icon name="chevron-right" className={expanded ? 'tree__chevron tree__chevron--open' : 'tree__chevron'} />}
    </Span>
  );
};

export { TreeTwisty };
