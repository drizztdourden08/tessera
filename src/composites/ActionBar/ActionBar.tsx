/* @layer renderer-components @kind component */
import { useRef } from 'react';
import { Box } from '../../primitives/Box';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ConfirmIconButtonQuestion } from '../ConfirmIconButton/sub-components/ConfirmIconButtonQuestion';
import { confirmOf } from './behavior/confirm-of';
import { restOf } from './behavior/rest-of';
import { splitActions } from './behavior/split-actions';
import { useActionFit } from './behavior/useActionFit';
import { useAsk } from './behavior/useAsk';
import { ActionBarButton } from './sub-components/ActionBarButton';
import { ActionBarMeasure } from './sub-components/ActionBarMeasure';
import { ActionBarMore } from './sub-components/ActionBarMore';
import type { ActionBarProps, ActionItem } from './ActionBar.type';
import './ActionBar.css';

const ActionBar = (props: ActionBarProps) => {
  const { actions, size = 'md', keep = Number.POSITIVE_INFINITY, overflowLabel, align = 'start', label, className } = props;
  const { items } = useTesseraStrings();
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const rest = restOf(actions);
  const fit = useActionFit(barRef, measureRef, rest.length, actions.map((action) => `${action.id}:${action.label}`).join('|'));
  const { primary, shown, folded } = splitActions(actions, keep, fit);
  const ask = useAsk(barRef);
  const { asking } = ask;
  const more = overflowLabel ?? items.more;
  const asks = (action: ActionItem) => confirmOf(action, items.confirmQuestion) !== undefined;
  const press = (action: ActionItem) => (asks(action) ? ask.ask(action) : action.onSelect());
  const askFor = (action: ActionItem) => {
    const words = confirmOf(action, items.confirmQuestion);
    return words && (
      <ConfirmIconButtonQuestion
        key={`ask-${action.id}`}
        className="action-bar__ask"
        label={action.label}
        question={words.title}
        danger={action.kind === 'danger'}
        confirmLabel={words.confirmLabel}
        ask={ask}
      />
    );
  };
  const draw = (action: ActionItem) => (asking?.id === action.id ? askFor(action) : <ActionBarButton key={action.id} action={action} size={size} onPress={press} />);
  const foldedAsking = asking !== null && folded.some((action) => action.id === asking.id);

  return (
    <Box ref={barRef} role="group" aria-label={label} className={className ? `action-bar ${className}` : 'action-bar'} data-align={align} data-size={size}>
      {shown.map(draw)}
      {folded.length > 0 && (foldedAsking ? askFor(asking) : <ActionBarMore folded={folded} size={size} label={more} asks={asks} onPress={press} />)}
      {primary.map(draw)}
      <ActionBarMeasure measureRef={measureRef} rest={rest} primary={primary} size={size} label={more} />
    </Box>
  );
};

export { ActionBar };
