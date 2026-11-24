/* @layer renderer-components @kind logic */
const carriesAccepted = (types: readonly string[], accept?: string): boolean =>
  accept === undefined || types.includes(accept);

export { carriesAccepted };
