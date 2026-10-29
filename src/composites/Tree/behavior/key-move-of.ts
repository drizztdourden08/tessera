/* @layer renderer-components @kind logic */
import type { TreeMoveRequest } from '../Tree.type';
import { keyMoveContext } from './key-move-context';
import { KEY_MOVES } from './key-moves.constants';
import type { KeyMoveInput } from './move-request.type';

const keyMoveOf = <T,>(input: KeyMoveInput<T>): TreeMoveRequest | undefined => {
  const context = keyMoveContext(input);
  return context ? KEY_MOVES[input.direction](context) : undefined;
};

export { keyMoveOf };
