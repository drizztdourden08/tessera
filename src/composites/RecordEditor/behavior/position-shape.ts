/* @layer renderer-components @kind logic */
import { keyOf } from '../../field-kits/key-of';
import { X_KEY, Y_KEY } from './position-shape.constants';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { PositionPair } from '../RecordEditor.type';

const numberChild = (
  children: readonly FieldDescriptor[],
  key: string,
): FieldDescriptor | undefined =>
  children.find((child) => keyOf(child.path) === key && child.kind === 'number');

const positionPairOf = (field: FieldDescriptor): PositionPair | undefined => {
  if (field.kind !== 'object') return undefined;
  const children = field.children ?? [];
  const x = numberChild(children, X_KEY);
  const y = numberChild(children, Y_KEY);
  if (!x || !y) return undefined;
  return {
    x,
    y,
    xKey: X_KEY,
    yKey: Y_KEY,
    others: children.filter((child) => child !== x && child !== y),
  };
};

export { positionPairOf };
