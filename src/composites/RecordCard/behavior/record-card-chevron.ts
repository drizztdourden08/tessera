/* @layer renderer-components @kind logic */
import type { RecordHeaderChevron } from '../../RecordHeader';
import type { RecordCardChevronInput } from '../RecordCard.type';

const chevronLabel = ({ expanded, name, named }: RecordCardChevronInput): string | undefined => {
  if (!name) return undefined;
  return expanded ? named.collapse(name) : named.expand(name);
};

const recordCardChevron = (input: RecordCardChevronInput): RecordHeaderChevron | undefined => {
  if (!input.expandable) return undefined;
  const { expanded, bodyId, onToggle } = input;
  return { expanded, onToggle, controls: expanded ? bodyId : undefined, label: chevronLabel(input) };
};

export { recordCardChevron };
