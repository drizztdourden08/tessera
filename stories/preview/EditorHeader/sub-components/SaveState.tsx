/* @layer stories @kind component */
import { Box, Span, Status, Tooltip } from '../../../../src/primitives';
import '../../../../src/theme/visually-hidden.css';
import { SAVE_STATUSES } from '../behavior/save-statuses';
import { EDITOR_STRINGS } from '../editor-strings.constants';
import type { SaveStateProps } from '../EditorBar.type';

const SaveState = (props: SaveStateProps) => {
  const { state, error, className } = props;
  const status = <Status map={SAVE_STATUSES} value={state} dot className="save-state__status" />;
  const why = state === 'error' && error ? error : undefined;
  return (
    <Box as="span" role="status" className={className ? `save-state ${className}` : 'save-state'} data-state={state}>
      {why ? <Tooltip content={why} focusable>{status}</Tooltip> : status}
      {why && <Span className="visually-hidden">{EDITOR_STRINGS.failedBecause(why)}</Span>}
    </Box>
  );
};

export { SaveState };
