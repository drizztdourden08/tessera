/* @layer renderer-components @kind types */
interface ChoiceRoom {
  box: Element;
  width: number;
}

type ChoiceRoomOf = (probe: HTMLElement) => ChoiceRoom | null;

export type { ChoiceRoom, ChoiceRoomOf };
